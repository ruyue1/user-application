import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Alert, App, Button, Empty, Flex, Radio, Space, Tag, Tooltip, Typography } from 'antd';
import {
  CreditCardOutlined,
  HomeOutlined,
  LogoutOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  applyCancellation,
  listAccessCards,
  type AccessCard,
  type AccessCardPageResponse,
} from '@/apis/accessCardContractApi';

/**
 * 门禁卡管理主页面路由。
 * 与 constants/routes 中登记的 path（access_card_main）经 pageRouteSegmentFromPath
 * 转换后得到的访问路径保持一致，仅用于页面内跳转，不注册路由。
 */
const ACCESS_CARD_MAIN_PATH = '/page/access-card-main';
/** 使用中门禁卡列表默认每页条数 */
const DEFAULT_PAGE_SIZE = 10;
/** 权限状态枚举取值 */
const PERMISSION_STATUS_IN_USE = '使用中';
/** 离职注销成功提示文案，明确需线下交还实体卡 */
const CANCEL_SUCCESS_MESSAGE = '离职注销申请已同步至飞码。请线下将实体卡交还门禁卡管理员。';
/** 底部功能图标区配置 */
const FOOTER_FEATURES = [
  { key: 'return', label: '门禁卡退还', icon: <CreditCardOutlined /> },
  { key: 'home', label: '返回首页', icon: <HomeOutlined /> },
  { key: 'sync', label: '同步飞码', icon: <SyncOutlined /> },
] as const;

type RequestErrorLike = {
  response?: {
    status?: number;
    data?: { code?: string; errorCode?: string; message?: string };
  };
};

/** 从异常中提取后端业务错误码（兼容 code / errorCode 两种字段） */
function extractErrorCode(error: unknown): string {
  const data = (error as RequestErrorLike)?.response?.data;
  return data?.code || data?.errorCode || '';
}

/** 将发起离职注销的异常映射为可读提示，未命中特定错误码时回落到后端 message */
function resolveCancelErrorMessage(error: unknown): string {
  const code = extractErrorCode(error);
  const serverMessage = (error as RequestErrorLike)?.response?.data?.message;

  if (code === 'NOT_FOUND') {
    return '该门禁卡已不存在，无法发起离职注销，请刷新列表后重试。';
  }
  if (code === 'INVALID_STATE') {
    return '该门禁卡当前状态不允许发起离职注销，请刷新列表后确认卡片权限状态。';
  }
  return serverMessage || '离职注销申请提交失败，请稍后重试。';
}

/**
 * 门禁卡退还页面
 *
 * 自上而下依次渲染标题「门禁卡退还」、说明文案、门禁卡信息列表、操作区与底部功能图标区。
 * 仅调用 PageImplementationContract 声明的接口：
 * - 初始加载与翻页时调用 listAccessCards 拉取本人名下「使用中」的门禁卡分页列表；
 * - 点击【离职注销】并在确认弹窗确认后调用 applyCancellation 发起离职注销，
 *   成功后提示线下交还实体卡并返回门禁卡管理主页面。
 * 【返回首页】仅做前端跳转，不产生注销请求。
 */
export default function CardReturn() {
  const navigate = useNavigate();
  const { message: messageApi, modal } = App.useApp();

  /** 当前查看的页码与每页条数，翻页时据此重新请求列表 */
  const [pageQuery, setPageQuery] = useState({ current: 1, pageSize: DEFAULT_PAGE_SIZE });
  /** 当前选中的待注销门禁卡，仅单条选择 */
  const [selectedCard, setSelectedCard] = useState<AccessCard | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /**
   * 拉取门禁卡分页列表。
   * 通过参数读取最新的页码与每页条数：翻页时直接以目标页码发起请求，
   * 避免 setState 异步导致请求仍携带旧页码。
   */
  const loadAccessCardPage = async (query: {
    current: number;
    pageSize: number;
  }): Promise<AccessCardPageResponse> => {
    return listAccessCards({ current: query.current, pageSize: query.pageSize });
  };

  const { data: accessCardPage, loading, error, refresh, run } = useRequest(
    loadAccessCardPage,
    { defaultParams: [pageQuery] },
  );

  /** 当前页每页条数，优先取响应体回传值 */
  const activePageSize = accessCardPage?.pageSize ?? pageQuery.pageSize;

  /** 仅列示权限状态为「使用中」的卡片 */
  const dataSource = useMemo<AccessCard[]>(
    () =>
      (accessCardPage?.list ?? []).filter(
        (item) => item.permissionStatus === PERMISSION_STATUS_IN_USE,
      ),
    [accessCardPage],
  );

  /** 选择状态按最新数据校正，避免继续引用已不在当前页的卡片 */
  const activeSelectedCard =
    selectedCard && dataSource.some((item) => item.id === selectedCard.id) ? selectedCard : null;

  /** 翻页查看（page_next）：按目标页码重新拉取列表数据 */
  const handleTableChange = (nextPage: number, nextPageSize: number) => {
    setPageQuery({ current: nextPage, pageSize: nextPageSize });
    setSelectedCard(null);
    run({ current: nextPage, pageSize: nextPageSize });
  };

  const handleRetry = () => {
    refresh();
  };

  /** 提交离职注销申请，成功后提示线下交还实体卡并返回门禁卡管理主页面 */
  const submitCancellation = async (record: AccessCard) => {
    setSubmitting(true);
    try {
      await applyCancellation({ accessCardId: record.id });
      messageApi.success(CANCEL_SUCCESS_MESSAGE);
      navigate(ACCESS_CARD_MAIN_PATH);
    } catch (cancelError) {
      messageApi.error(resolveCancelErrorMessage(cancelError));
      // 卡片不存在或状态已变更时刷新列表，反映最新权限状态
      const code = extractErrorCode(cancelError);
      if (code === 'NOT_FOUND' || code === 'INVALID_STATE') {
        refresh();
      }
    } finally {
      setSubmitting(false);
    }
  };

  /** 离职注销（apply_cancel）：确认后调用 applyCancellation */
  const handleApplyCancellation = () => {
    const targetCard = activeSelectedCard ?? (dataSource.length === 1 ? dataSource[0] : undefined);

    if (!targetCard) {
      messageApi.warning('请先在列表中选择需要离职注销的门禁卡。');
      return;
    }

    modal.confirm({
      title: '确认发起离职注销？',
      content: (
        <Space direction='vertical' size={4}>
          <span>{`将注销 ${targetCard.name}（${targetCard.employeeNo}）名下的门禁卡 ${targetCard.cardNo}。`}</span>
          <span>确认后申请注销字段将更新为「离职」并同步至飞码，触发飞码端注销流程。</span>
          <span>提交成功后请线下将实体卡交还门禁卡管理员，并返回门禁卡管理主页面。</span>
        </Space>
      ),
      okText: '确认注销',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => submitCancellation(targetCard),
    });
  };

  /** 返回首页（back_home）：跳转门禁卡管理主页面 */
  const handleBackHome = () => {
    navigate(ACCESS_CARD_MAIN_PATH);
  };

  const columns = useMemo<ProColumns<AccessCard>[]>(
    () => [
      {
        title: '选择',
        dataIndex: 'id',
        width: 64,
        render: (_, record) => (
          <Radio
            checked={activeSelectedCard?.id === record.id}
            onChange={() => setSelectedCard(record)}
            aria-label={`选择门禁卡 ${record.cardNo}`}
          />
        ),
      },
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
        width: 140,
      },
      {
        title: '权限状态',
        dataIndex: 'permissionStatus',
        valueType: 'text',
        width: 110,
        render: (_, record) => (
          <Tag color={record.permissionStatus === PERMISSION_STATUS_IN_USE ? 'blue' : 'default'}>
            {record.permissionStatus}
          </Tag>
        ),
      },
    ],
    [activeSelectedCard],
  );

  return (
    <PageContainer
      header={{ title: '门禁卡退还' }}
      breadcrumbRender={false}
      content='所有字段信息直接从扫码获取，并实时同步到飞码'
    >
      <Flex vertical gap={16} style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <ProCard
          bordered={false}
          boxShadow
          style={{
            borderRadius: 16,
            background: 'linear-gradient(160deg, #e8f2ff 0%, #ffffff 60%)',
          }}
          bodyStyle={{ padding: '24px 20px' }}
        >
          <Typography.Title
            level={3}
            style={{ textAlign: 'center', color: '#1d39c4', marginTop: 0, marginBottom: 8 }}
          >
            门禁卡退还
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'center', color: '#597ef7', marginBottom: 0 }}>
            所有字段信息直接从扫码获取，并实时同步到飞码
          </Typography.Paragraph>

          {error ? (
            <Alert
              style={{ marginTop: 16 }}
              type='error'
              showIcon
              message='门禁卡信息加载失败'
              description='请检查网络连接后重试。'
              action={
                <Button size='small' type='primary' onClick={handleRetry}>
                  重试
                </Button>
              }
            />
          ) : null}
        </ProCard>

        <ProCard title='门禁卡信息' bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <ProTable<AccessCard>
            rowKey='id'
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            search={false}
            options={false}
            revalidateOnFocus={false}
            cardProps={{ bodyStyle: { padding: 0 } }}
            locale={{
              emptyText: error ? (
                <Empty description='暂无数据，加载失败' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Empty description='暂无使用中的门禁卡' image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ),
            }}
            pagination={{
              current: pageQuery.current,
              pageSize: activePageSize,
              total: accessCardPage?.total ?? 0,
              showSizeChanger: false,
              showTotal: (total) => `共 ${total} 张使用中的门禁卡`,
              onChange: (nextPage, nextPageSize) => handleTableChange(nextPage, nextPageSize),
            }}
            scroll={{ x: 'max-content' }}
            style={{ overflow: 'visible' }}
          />
        </ProCard>

        <ProCard bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <Space direction='vertical' size={12} style={{ width: '100%' }}>
            <Space wrap size={12}>
              <Tooltip
                title={
                  dataSource.length > 1 && !activeSelectedCard
                    ? '请先在列表中选择需要注销的门禁卡'
                    : undefined
                }
              >
                <span>
                  <Button
                    type='primary'
                    danger
                    size='large'
                    icon={<LogoutOutlined />}
                    loading={submitting}
                    disabled={
                      loading ||
                      !dataSource.length ||
                      (dataSource.length > 1 && !activeSelectedCard)
                    }
                    onClick={handleApplyCancellation}
                    style={{ height: 48, minWidth: 160, borderRadius: 8, fontSize: 16 }}
                  >
                    离职注销
                  </Button>
                </span>
              </Tooltip>
              <Button
                size='large'
                icon={<HomeOutlined />}
                onClick={handleBackHome}
                style={{ height: 48, minWidth: 140, borderRadius: 8, fontSize: 16 }}
              >
                返回首页
              </Button>
            </Space>
            <Typography.Text type={activeSelectedCard ? 'success' : 'secondary'}>
              {activeSelectedCard
                ? `已选择 ${activeSelectedCard.name} 的卡号 ${activeSelectedCard.cardNo}，点击「离职注销」后需在确认弹窗中确认`
                : dataSource.length > 1
                  ? '仅展示本人名下「使用中」的门禁卡，请先选择需要注销的卡片'
                  : '仅展示本人名下「使用中」的门禁卡，点击「离职注销」后需在确认弹窗中确认'}
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
    </PageContainer>
  );
}
