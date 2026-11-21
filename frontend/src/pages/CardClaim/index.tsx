import { type CSSProperties, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { CheckSquareOutlined, HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  ConfigProvider,
  Empty,
  Modal,
  Result,
  Space,
  Tag,
  message,
} from 'antd';
import {
  completeClaim,
  fetchAccessCardClaimApplicationList,
  type AccessCardClaimApplicationItem,
  type AccessCardClaimApplicationPage,
} from '@/apis/contractAccessCardClaimApplicationApi';

/** 页面主题色：蓝色调扁平化风格 */
const PRIMARY_COLOR = '#1677ff';
const PRIMARY_DEEP_COLOR = '#0b4fc4';

/** 完成领签后回到首页的目标路由（页面 path: main → /page/main） */
const BACK_HOME_PATH = '/page/main';

/** 默认每页条数 */
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = ['10', '20', '50'];

/** 领签状态取值 */
const CLAIM_STATUS_PENDING = '待领签';
const CLAIM_STATUS_DONE = '已领签';

/** 完成领签接口错误码 → 页面提示（与 API Contract error_codes 一致） */
const COMPLETE_CLAIM_ERROR_MESSAGES: Record<string, string> = {
  INVALID_STATE: '所选明细当前不处于待领签状态，请刷新列表后重试',
  NOT_FOUND: '所选申请明细不存在，请刷新列表后重试',
};

/** 表格行标识 */
const ROW_KEY = 'id';

const pageStyle: CSSProperties = {
  position: 'relative',
  minHeight: '100%',
  overflow: 'hidden',
  borderRadius: 16,
  background: `linear-gradient(180deg, #eaf3ff 0%, #f6faff 46%, ${PRIMARY_COLOR} 46%, ${PRIMARY_DEEP_COLOR} 100%)`,
};

/** 底部装饰图形：高楼大厦 + 柱状图，纯 CSS 绘制（与主页面风格一致） */
function BottomDecoration() {
  return (
    <div
      aria-hidden='true'
      style={{
        position: 'relative',
        height: 168,
        marginTop: 24,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 34,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
          height: 108,
        }}
      >
        {[52, 84, 66, 108, 74, 96, 58].map((height, index) => (
          <div
            key={`tower-${index}`}
            style={{
              width: 26,
              height,
              borderRadius: '6px 6px 0 0',
              background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.86)' : 'rgba(255, 255, 255, 0.58)',
              boxShadow: '0 4px 12px rgba(2, 40, 110, 0.18)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 92,
        }}
      >
        {[26, 44, 34, 60, 38, 50, 30].map((height, index) => (
          <div
            key={`bar-${index}`}
            style={{
              width: 14,
              height,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.42)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 从请求异常中提取接口错误码（如 INVALID_STATE / NOT_FOUND）。
 */
function resolveErrorCode(error: unknown): string {
  const data = (error as { response?: { data?: unknown } } | undefined)?.response?.data;
  if (!data || typeof data !== 'object') return '';
  const body = data as { errorCode?: unknown; code?: unknown };
  const code = body.errorCode ?? body.code;
  return typeof code === 'string' ? code : '';
}

/**
 * 从请求异常中提取可展示的中文错误信息。
 */
function resolveErrorMessage(error: unknown, fallback: string): string {
  const code = resolveErrorCode(error);
  if (code && COMPLETE_CLAIM_ERROR_MESSAGES[code]) {
    return COMPLETE_CLAIM_ERROR_MESSAGES[code];
  }
  const data = (error as { response?: { data?: unknown } } | undefined)?.response?.data as
    | { message?: unknown; errorMessage?: unknown }
    | undefined;
  const serverMessage = data?.message ?? data?.errorMessage;
  if (typeof serverMessage === 'string' && serverMessage.trim()) return serverMessage;
  const errorMessage = (error as { message?: unknown } | undefined)?.message;
  if (typeof errorMessage === 'string' && errorMessage.trim()) return errorMessage;
  return fallback;
}

/**
 * 门禁卡领用页面（pageId: card_claim）
 *
 * - 初始加载、翻页、完成领签成功后调用 contract_access_card_claim_application.list 查询本人待领签明细
 * - 支持单条勾选、取消勾选与一键全选，跨页按明细 id 维护勾选集合
 * - 点击完成领签后二次确认，调用 complete_claim 提交勾选明细；未勾选时仅提示不发起请求
 * - 支持返回首页导航至主页面
 */
export default function CardClaim() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  /** 勾选的申请明细标识集合（跨页按 id 维护） */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  /** 当前页加载中标记，用于控制「全选 / 取消全选」与批量操作按钮的可用性 */
  const [tableLoading, setTableLoading] = useState(true);
  /** 当前页明细记录，用于一键全选 / 取消全选 */
  const [pageRecords, setPageRecords] = useState<AccessCardClaimApplicationItem[]>([]);
  /** 列表请求失败提示，失败时可重试 */
  const [loadError, setLoadError] = useState('');
  /** 完成领签提交中标记 */
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  /** 当前页可领签（未禁用勾选）明细 */
  const selectableRecords = pageRecords.filter(
    (record) => record.claimStatus !== CLAIM_STATUS_DONE,
  );
  /** 当前页可领签明细是否已全部选中 */
  const allPageSelected =
    selectableRecords.length > 0 &&
    selectableRecords.every((record) => selectedRowKeys.includes(record.id));

  // 结果需要被读取，必须用 runAsync：run 的返回类型是 void，取不到 data。
  const { runAsync: runCompleteClaim } = useRequest(completeClaim, { manual: true });

  /** 列表请求：分页查询本人待领签的申请明细；current / pageSize 为契约必填分页参数 */
  const fetchPage = useCallback(
    async (params: { current: number; pageSize: number }): Promise<AccessCardClaimApplicationPage> =>
      fetchAccessCardClaimApplicationList({
        current: params.current,
        pageSize: params.pageSize,
      }),
    [],
  );

  /** 全选：选中当前列表全部待领签明细（已领签明细不参与勾选） */
  const handleSelectAll = useCallback((records: AccessCardClaimApplicationItem[]) => {
    setSelectedRowKeys((prev) => {
      const next = new Set(prev);
      records.forEach((record) => {
        if (record?.id && record.claimStatus !== CLAIM_STATUS_DONE) next.add(record.id);
      });
      return Array.from(next);
    });
  }, []);

  /** 取消全选：清空当前列表勾选 */
  const handleClearAll = useCallback((records: AccessCardClaimApplicationItem[]) => {
    setSelectedRowKeys((prev) => {
      const currentIds = new Set(records.map((record) => record.id));
      return prev.filter((key) => !currentIds.has(key));
    });
  }, []);

  /** 完成领签：提交勾选明细的 id 列表，成功后刷新列表 */
  const handleCompleteClaim = useCallback(() => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请先选择需要领签的明细');
      return;
    }

    const applicationIds = [...selectedRowKeys];
    Modal.confirm({
      title: '确认完成领签',
      content: `已选择 ${applicationIds.length} 条申请明细，确认提交后将更新为已领签并同步至飞码。`,
      okText: '确认提交',
      cancelText: '取消',
      onOk: async () => {
        setSubmitting(true);
        try {
          const result = await runCompleteClaim({ applicationIds });
          const updatedCount = result?.updatedCount ?? applicationIds.length;
          // 成功后清空本地勾选并重新拉取列表
          setSelectedRowKeys([]);
          await actionRef.current?.reload();
          messageApi.success(`已完成领签 ${updatedCount} 条明细`);
        } catch (error) {
          // 失败时保留本地勾选状态，便于员工重试
          messageApi.error(resolveErrorMessage(error, '完成领签失败，请稍后重试'));
        } finally {
          setSubmitting(false);
        }
      },
    });
  }, [messageApi, runCompleteClaim, selectedRowKeys]);

  /** 返回首页 */
  const handleBackHome = useCallback(() => {
    navigate(BACK_HOME_PATH);
  }, [navigate]);

  const columns: ProColumns<AccessCardClaimApplicationItem>[] = [
    {
      title: '姓名',
      dataIndex: 'employeeName',
      ellipsis: true,
      width: 110,
    },
    {
      title: '员工编号',
      dataIndex: 'employeeNo',
      ellipsis: true,
      width: 130,
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
      ellipsis: true,
      width: 150,
    },
    {
      title: '领签状态',
      dataIndex: 'claimStatus',
      width: 110,
      valueEnum: {
        [CLAIM_STATUS_PENDING]: { text: CLAIM_STATUS_PENDING, status: 'Warning' },
        [CLAIM_STATUS_DONE]: { text: CLAIM_STATUS_DONE, status: 'Success' },
      },
      render: (_, record) => (
        <Tag color={record.claimStatus === CLAIM_STATUS_DONE ? 'success' : 'warning'}>
          {record.claimStatus}
        </Tag>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      {contextHolder}
      <div style={pageStyle}>
        <ProCard
          ghost
          style={{ background: 'transparent' }}
          bodyStyle={{ padding: '24px 16px 0' }}
        >
          <Result
            icon={<SafetyCertificateOutlined style={{ color: PRIMARY_COLOR }} />}
            title='门禁卡领用'
            subTitle='请核对本人名下待领签的申请明细，勾选后完成领签'
            style={{ padding: '8px 0 0' }}
          />
        </ProCard>

        <div style={{ position: 'relative', padding: '24px 16px 0' }}>
          <ProTable<AccessCardClaimApplicationItem>
            rowKey={ROW_KEY}
            actionRef={actionRef}
            columns={columns}
            cardBordered
            ghost={false}
            search={false}
            options={false}
            scroll={{ x: 500 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description='暂无可领签的门禁卡申请明细'
                />
              ),
            }}
            request={async (params) => {
              const current = params.current ?? 1;
              const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
              setTableLoading(true);
              try {
                const res = await fetchPage({ current, pageSize });
                const list = Array.isArray(res?.list) ? res.list : [];
                setLoadError('');
                setPageRecords(list);
                return {
                  data: list,
                  total: res?.total ?? 0,
                  current: res?.current ?? current,
                  pageSize: res?.pageSize ?? pageSize,
                  success: true,
                };
              } catch (error) {
                // 请求失败：不改变本地勾选状态，展示可重试错误提示
                setPageRecords([]);
                setLoadError(resolveErrorMessage(error, '服务暂时不可用，请稍后重试'));
                return { data: [], total: 0, success: false };
              } finally {
                setTableLoading(false);
              }
            }}
            pagination={{
              defaultPageSize: DEFAULT_PAGE_SIZE,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            rowSelection={{
              selectedRowKeys,
              preserveSelectedRowKeys: true,
              getCheckboxProps: (record) => ({
                disabled: record.claimStatus === CLAIM_STATUS_DONE,
              }),
              onChange: (keys) => setSelectedRowKeys(keys as string[]),
            }}
            tableAlertRender={({ selectedRowKeys: keys }) => (
              <Space size={4}>
                <span>已选择 {keys.length} 项待领签明细</span>
              </Space>
            )}
            tableAlertOptionRender={({ onCleanSelected }) => (
              <Button type='link' size='small' onClick={onCleanSelected}>
                清空勾选
              </Button>
            )}
            toolBarRender={() => [
              <Button
                key='select-all'
                data-action-id='select_all-control'
                disabled={tableLoading || selectableRecords.length === 0}
                onClick={() =>
                  allPageSelected ? handleClearAll(pageRecords) : handleSelectAll(pageRecords)
                }
              >
                {allPageSelected ? '取消全选' : '一键全选'}
              </Button>,
              <Button
                key='complete-claim'
                type='primary'
                icon={<CheckSquareOutlined />}
                loading={submitting}
                data-action-id='complete_claim-control'
                onClick={handleCompleteClaim}
              >
                完成领签
              </Button>,
            ]}
            headerTitle={
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0f2540' }}>
                待领签明细
              </span>
            }
          />

          {loadError ? (
            <div style={{ marginTop: 12 }}>
              <Alert
                type='error'
                showIcon
                message='明细加载失败'
                description={loadError}
                action={
                  <Button size='small' onClick={() => actionRef.current?.reload()}>
                    重新加载
                  </Button>
                }
              />
            </div>
          ) : null}

          <div style={{ marginTop: 16 }}>
            <Alert
              type='info'
              showIcon
              message='提示：完成领签后，签收状态将实时同步至飞码端门禁卡管理系统。'
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              block
              icon={<HomeOutlined />}
              data-action-id='back_home-control'
              style={{
                height: 44,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                borderColor: 'rgba(22, 119, 255, 0.32)',
                color: PRIMARY_DEEP_COLOR,
                fontWeight: 600,
              }}
              onClick={handleBackHome}
            >
              返回首页
            </Button>
          </div>

          <BottomDecoration />
        </div>
      </div>
    </ConfigProvider>
  );
}
