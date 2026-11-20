import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Alert, Button, Drawer, Empty, Flex, Space, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  HomeOutlined,
  IdcardOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  completeClaim,
  listAccessCardApplications,
  type AccessCardApplication,
} from '@/apis/accessCardApplicationContractApi';
import { useIdentity } from '@/platform/identity/useIdentity';

/** 门禁卡管理主页面路由，对应产品页面 card_claim 的 navigation 绑定目标 */
const ACCESS_CARD_MAIN_PATH = '/page/access-card-main';
/** 申请明细默认每页条数 */
const DEFAULT_PAGE_SIZE = 10;
/** 领签状态枚举取值 */
const CLAIM_STATUS_PENDING = '待领签';
const CLAIM_STATUS_DONE = '已领签';
/** 未识别到扫码人时使用的领签人标识，与门禁卡管理主页面保持一致 */
const FALLBACK_CLAIMER_ID = '';
/** 底部功能图标区配置 */
const FOOTER_FEATURES = [
  { key: 'claim', label: '门禁卡领用', icon: <IdcardOutlined /> },
  { key: 'home', label: '返回首页', icon: <HomeOutlined /> },
  { key: 'sync', label: '同步飞码', icon: <CheckCircleOutlined /> },
] as const;

type RequestErrorLike = {
  response?: {
    status?: number;
    data?: { code?: string; errorCode?: string; message?: string };
  };
};

type ToastKind = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  kind: ToastKind;
  text: string;
}

/** 从异常中提取后端业务错误码（兼容 code / errorCode 两种字段） */
function extractErrorCode(error: unknown): string {
  const data = (error as RequestErrorLike)?.response?.data;
  return data?.code || data?.errorCode || '';
}

/** 将完成领签异常映射为可读提示，未命中特定错误码时回落到后端 message */
function resolveClaimErrorMessage(error: unknown): string {
  const code = extractErrorCode(error);
  const serverMessage = (error as RequestErrorLike)?.response?.data?.message;

  if (code === 'INVALID_PARAMETER') {
    return '提交的领签明细参数不合法，请重新勾选待领签明细后再试。';
  }
  if (code === 'NOT_FOUND') {
    return '部分领签明细已不存在，系统将刷新列表，请重新勾选。';
  }
  if (code === 'INVALID_STATE') {
    return '部分明细当前状态已变更，无法重复领签，请刷新后重试。';
  }
  return serverMessage || '完成领签失败，请稍后重试。';
}

/** 读取勾选结果，兼容 antd 多选模式下 array 与 { keys } 两种 onChange 入参 */
function readSelectedKeys(selection: unknown): string[] {
  if (Array.isArray(selection)) {
    return selection.map((item) => String(item));
  }
  const keys = (selection as { keys?: unknown[] } | null)?.keys;
  if (Array.isArray(keys)) {
    return keys.map((item) => String(item));
  }
  return [];
}

/**
 * 门禁卡领用页面
 *
 * 自上而下为标题、说明文案、申请明细列表、操作区与底部功能图标区。
 * 仅调用 PageImplementationContract 声明的接口：
 * - 初始加载与完成领签成功后调用 listAccessCardApplications 拉取本人待领签明细；
 * - 点击【完成领签】调用 completeClaim 提交已勾选明细。
 */
export default function CardClaim() {
  const navigate = useNavigate();
  const { identity } = useIdentity();

  // 优先使用平台扫码身份上下文中的扫码人ID，取不到时使用与主页面一致的兜底标识
  const claimerId = identity?.userId || FALLBACK_CLAIMER_ID;

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [errorTipOpen, setErrorTipOpen] = useState(false);

  /** 申请明细分页查询，pageInfoChange 回传分页/排序变化，rowCountChange 记录总数 */
  const fetchApplications = useCallback(
    async (pageInfoChange?: { current?: number; pageSize?: number }) => {
      try {
        const page = await listAccessCardApplications({
          claimerId,
          current: pageInfoChange?.current ?? 1,
          pageSize: pageInfoChange?.pageSize ?? DEFAULT_PAGE_SIZE,
        });
        setToast(null);
        setErrorTipOpen(false);
        // 剔除服务端已不存在/已领签的明细，避免提交失效的记录 id
        const claimableIds = new Set(
          page.list
            .filter((item) => item.claimStatus === CLAIM_STATUS_PENDING)
            .map((item) => item.id),
        );
        setSelectedRowKeys((prev) => prev.filter((key) => claimableIds.has(key)));
        return {
          data: page.list,
          success: true,
          total: page.total,
          pageSize: page.pageSize ?? pageInfoChange?.pageSize ?? DEFAULT_PAGE_SIZE,
        };
      } catch (error) {
        setToast({ kind: 'error', text: '门禁卡申请明细加载失败，请稍后重试。' });
        return {
          data: [] as AccessCardApplication[],
          success: false,
          total: 0,
          pageSize: pageInfoChange?.pageSize ?? DEFAULT_PAGE_SIZE,
        };
      }
    },
    [claimerId],
  );

  const { data: applicationPage, loading, error, run, refresh } = useRequest(fetchApplications, {
    defaultParams: [undefined],
  });

  const claimRequest = useRequest(completeClaim, {
    manual: true,
    onBefore: () => {
      setToast(null);
    },
    onSuccess: (result) => {
      setToast({
        kind: 'success',
        text:
          result.updatedCount > 0
            ? `已完成 ${result.updatedCount} 条明细的领签，签收结果已同步至飞码。`
            : '本次没有新的明细被更新，请刷新列表确认领签状态。',
      });
      setSelectedRowKeys([]);
      // 完成领签后重新拉取第一页列表，反映最新领签状态
      run({ current: 1, pageSize: applicationPage?.pageSize ?? DEFAULT_PAGE_SIZE });
    },
    onError: (requestError) => {
      const code = extractErrorCode(requestError);
      setToast({ kind: 'error', text: resolveClaimErrorMessage(requestError) });
      // 明细不存在或状态已变更时同步刷新列表，勾选状态由刷新逻辑按最新数据校正
      if (code === 'NOT_FOUND' || code === 'INVALID_STATE') {
        refresh();
      }
    },
  });

  const isClaiming = claimRequest.loading;
  const hasSelection = selectedRowKeys.length > 0;
  const claimDisabled = !hasSelection || isClaiming;

  const handleSelectionChange = (selection: unknown) => {
    setSelectedRowKeys(readSelectedKeys(selection));
  };

  const handleCompleteClaim = () => {
    if (!hasSelection) {
      setToast({ kind: 'warning', text: '请先勾选需要领签的申请明细。' });
      return;
    }
    claimRequest.run({ ids: selectedRowKeys });
  };

  const handleBackHome = () => {
    navigate(ACCESS_CARD_MAIN_PATH);
  };

  const columns = useMemo<ProColumns<AccessCardApplication>[]>(
    () => [
      {
        title: '姓名',
        dataIndex: 'name',
        valueType: 'text',
        width: 110,
        ellipsis: true,
      },
      {
        title: '员工编号',
        dataIndex: 'employeeNo',
        valueType: 'text',
        width: 130,
      },
      {
        title: '卡号',
        dataIndex: 'cardNo',
        valueType: 'text',
        width: 130,
      },
      {
        title: '领签状态',
        dataIndex: 'claimStatus',
        valueType: 'text',
        width: 110,
        render: (_, record) => (
          <Tag color={record.claimStatus === CLAIM_STATUS_DONE ? 'green' : 'blue'}>
            {record.claimStatus}
          </Tag>
        ),
      },
    ],
    [],
  );

  const toastColorMap: Record<ToastKind, string> = {
    success: '#f6ffed',
    error: '#fff1f0',
    warning: '#fffbe6',
    info: '#e6f4ff',
  };
  const toastTextColorMap: Record<ToastKind, string> = {
    success: '#237804',
    error: '#a8071a',
    warning: '#ad6800',
    info: '#0958d9',
  };
  const toastTypeMap: Record<ToastKind, 'success' | 'error' | 'warning' | 'info'> = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <PageContainer
      header={{ title: '门禁卡领用' }}
      breadcrumbRender={false}
      content='所有字段信息直接从扫码获取，并实时同步到飞码'
    >
      <Flex vertical gap={16} style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <ProCard
          bordered={false}
          boxShadow
          style={{ borderRadius: 16, background: 'linear-gradient(160deg, #e8f2ff 0%, #ffffff 60%)' }}
          bodyStyle={{ padding: '24px 20px' }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: 'center', color: '#1d39c4', marginTop: 0, marginBottom: 8 }}
          >
            门禁卡领用
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'center', color: '#597ef7', marginBottom: 0 }}>
            所有字段信息直接从扫码获取，并实时同步到飞码
          </Typography.Paragraph>

          {toast ? (
            <Alert
              style={{ marginTop: 16, background: toastColorMap[toast.kind] }}
              type={toastTypeMap[toast.kind]}
              showIcon
              message={
                <span style={{ color: toastTextColorMap[toast.kind] }}>{toast.text}</span>
              }
              closable
              onClose={() => setToast(null)}
            />
          ) : null}

          {error ? (
            <Alert
              style={{ marginTop: 16 }}
              type='error'
              showIcon
              message='门禁卡申请明细加载失败'
              description='请检查网络连接后重试。'
              action={
                <Button size='small' type='primary' onClick={() => refresh()}>
                  重试
                </Button>
              }
            />
          ) : null}

          {!identity?.userId ? (
            <Alert
              style={{ marginTop: 16 }}
              type='warning'
              showIcon
              message='未识别到扫码身份'
              description='请通过招乎APP重新扫码进入，以便匹配本人名下待领签明细。'
              action={
                <Button size='small' onClick={() => setErrorTipOpen(true)}>
                  如何扫码
                </Button>
              }
            />
          ) : null}
        </ProCard>

        <ProCard title='申请明细' bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <ProTable<AccessCardApplication>
            rowKey='id'
            columns={columns}
            dataSource={applicationPage?.data ?? []}
            loading={loading}
            search={false}
            options={false}
            revalidateOnFocus={false}
            cardProps={{ bodyStyle: { padding: 0 } }}
            locale={{
              emptyText: error ? (
                <Empty description='暂无数据，加载失败' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Empty description='暂无待领签的申请明细' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ),
            }}
            rowSelection={{
              selectedRowKeys,
              preserveSelectedRowKeys: false,
              onChange: (selection) => handleSelectionChange(selection),
              getCheckboxProps: (record) => ({
                disabled: record.claimStatus !== CLAIM_STATUS_PENDING,
              }),
            }}
            tableAlertRender={({ selectedRowKeys: alertKeys }) =>
              alertKeys.length > 0 ? (
                <Space size={8}>
                  <span>{`已选择 ${alertKeys.length} 条待领签明细`}</span>
                  <Button type='link' size='small' onClick={() => setSelectedRowKeys([])}>
                    取消选择
                  </Button>
                </Space>
              ) : (
                <span>尚未勾选明细，可单条勾选或一键全选待领签明细</span>
              )
            }
            pagination={{
              defaultPageSize: DEFAULT_PAGE_SIZE,
              pageSizeOptions: [10, 20, 50],
              showSizeChanger: true,
              onChange: (current, pageSize) => {
                run({ current, pageSize });
              },
            }}
            scroll={{ x: 'max-content' }}
            style={{ overflow: 'visible' }}
          />
        </ProCard>

        <ProCard bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <Space direction='vertical' size={12} style={{ width: '100%' }}>
            <Space wrap size={12}>
              <Button
                type='primary'
                size='large'
                icon={<CheckCircleOutlined />}
                loading={isClaiming}
                disabled={claimDisabled}
                onClick={handleCompleteClaim}
                style={{ height: 48, minWidth: 160, borderRadius: 8, fontSize: 16 }}
              >
                完成领签
              </Button>
              <Button
                size='large'
                icon={<HomeOutlined />}
                onClick={handleBackHome}
                style={{ height: 48, minWidth: 140, borderRadius: 8, fontSize: 16 }}
              >
                返回首页
              </Button>
            </Space>
            <Typography.Text type={hasSelection ? 'success' : 'secondary'}>
              {hasSelection
                ? `已勾选 ${selectedRowKeys.length} 条明细，点击「完成领签」提交`
                : '请至少勾选一条待领签明细后再完成领签'}
            </Typography.Text>
          </Space>
        </ProCard>

        <ProCard bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <Flex justify='space-around' align='center'>
            {FOOTER_FEATURES.map((item) => {
              const isHome = item.key === 'home';
              return (
                <Flex
                  key={item.key}
                  vertical
                  align='center'
                  gap={6}
                  onClick={isHome ? handleBackHome : undefined}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    color: isHome ? '#1677ff' : '#8c8c8c',
                    cursor: isHome ? 'pointer' : 'default',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <Typography.Text type={isHome ? 'success' : 'secondary'} style={{ fontSize: 12 }}>
                    {item.label}
                  </Typography.Text>
                </Flex>
              );
            })}
          </Flex>
        </ProCard>
      </Flex>

      <Drawer
        title='扫码身份说明'
        placement='bottom'
        height={220}
        open={errorTipOpen}
        onClose={() => setErrorTipOpen(false)}
      >
        <Space direction='vertical' size={8}>
          <Flex align='center' gap={8}>
            <WarningOutlined style={{ color: '#faad14' }} />
            <span>请使用招乎APP扫描门禁卡领用二维码进入本页面。</span>
          </Flex>
          <span>系统将通过扫码识别出的扫码人ID匹配你名下的待领签申请明细。</span>
          <span>如扫码后仍无法识别本人明细，请联系门禁卡管理员核对申请数据。</span>
        </Space>
      </Drawer>
    </PageContainer>
  );
}
