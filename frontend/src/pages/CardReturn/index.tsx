import { type CSSProperties, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { ProCard, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  CheckCircleFilled,
  HomeOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  ConfigProvider,
  Descriptions,
  Empty,
  Modal,
  Result,
  Tag,
  message,
} from 'antd';
import {
  DEFAULT_CURRENT,
  DEFAULT_DEACTIVATION_APPLICATION,
  DEFAULT_PAGE_SIZE,
  applyDeactivation,
  listAccessCards,
  type AccessCardDeactivationResponse,
  type AccessCardItem,
} from '@/apis/contractAccessCardApi';

/** 页面主题色：蓝色调扁平化风格 */
const PRIMARY_COLOR = '#1677ff';
const PRIMARY_DEEP_COLOR = '#0b4fc4';

/** 返回首页的目标路由（页面 path: main → /page/main） */
const BACK_HOME_PATH = '/page/main';

/** 分页容量选项 */
const PAGE_SIZE_OPTIONS = ['10', '20', '50'];

/** 表格行标识 */
const ROW_KEY = 'id';

/** 门禁卡权限状态取值（API Contract 枚举） */
const PERMISSION_STATUS_IN_USE = '使用中';

/** 提交离职注销错误码 → 页面提示（与 API Contract error_codes 一致） */
const APPLY_DEACTIVATION_ERROR_MESSAGES: Record<string, string> = {
  NOT_FOUND: '未找到该门禁卡记录，请刷新列表后重试',
  INVALID_STATE: '该门禁卡当前状态不支持重复提交离职注销申请，请刷新列表查看最新状态',
};

const pageStyle: CSSProperties = {
  position: 'relative',
  minHeight: '100%',
  overflow: 'hidden',
  borderRadius: 16,
  background: `linear-gradient(180deg, #eaf3ff 0%, #f6faff 46%, ${PRIMARY_COLOR} 46%, ${PRIMARY_DEEP_COLOR} 100%)`,
};

/** 底部装饰图形：高楼大厦 + 柱状图，纯 CSS 绘制（与 CardClaim / 主页面风格一致） */
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
              background:
                index % 2 === 0 ? 'rgba(255, 255, 255, 0.86)' : 'rgba(255, 255, 255, 0.58)',
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
 * 从请求异常中提取接口错误码（如 NOT_FOUND / INVALID_STATE）。
 */
function resolveErrorCode(error: unknown): string {
  const data = (error as { response?: { data?: unknown } } | undefined)?.response?.data;
  if (!data || typeof data !== 'object') return '';
  const body = data as { errorCode?: unknown; code?: unknown };
  const code = body.errorCode ?? body.code;
  return typeof code === 'string' ? code : '';
}

/**
 * 从请求异常中提取可展示的中文错误信息，优先按错误码映射。
 */
function resolveErrorMessage(
  error: unknown,
  fallback: string,
  errorMessages: Record<string, string> = {},
): string {
  const code = resolveErrorCode(error);
  if (code && errorMessages[code]) return errorMessages[code];
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
 * 判断卡片是否已发起离职注销申请。
 */
function hasAppliedDeactivation(value?: string | null): boolean {
  return value === DEFAULT_DEACTIVATION_APPLICATION;
}

/**
 * 门禁卡归还页面（pageId: card_return）
 *
 * - 展示标题「门禁卡退还」及飞码同步说明文案，提供「返回首页」（跳回 main 页面）操作
 * - 初始加载、翻页及离职注销成功后调用 contract_access_card.list 分页展示本人名下使用中门禁卡列表
 * - 列表展示姓名（employeeName）、员工编号（employeeNo）、卡号（cardNo）、权限状态（permissionStatus）、申请注销（deactivationApplication）及操作列
 * - 对未申请离职注销的使用中门禁卡点击「离职注销」并二次确认后调用 contract_access_card.apply_deactivation
 * - 提交成功后留在当前页面展示注销申请提交成功及线下将实体卡交还门禁卡管理员的反馈提示，并刷新当前列表
 */
export default function CardReturn() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  /** 列表请求失败提示，失败时可重试 */
  const [loadError, setLoadError] = useState('');
  /** 正在提交注销申请的门禁卡主键，用于行按钮 loading 与防重复提交 */
  const [submittingCardId, setSubmittingCardId] = useState('');
  /** 最近一次在当前页面提交成功的离职注销记录（留在原页面内反馈，不切换/跳转独立完成页） */
  const [latestDeactivationResult, setLatestDeactivationResult] =
    useState<AccessCardDeactivationResponse | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // 通过 useRequest 调用 contract_access_card.list 与 contract_access_card.apply_deactivation
  const { runAsync: runListAccessCards, loading: listLoading } = useRequest(listAccessCards, {
    manual: true,
  });
  const { runAsync: runApplyDeactivation } = useRequest(applyDeactivation, {
    manual: true,
  });

  /** 提交离职注销：二次确认后调用 applyDeactivation，成功后留在当前页反馈并刷新列表 */
  const handleApplyDeactivation = useCallback(
    (record: AccessCardItem) => {
      if (submittingCardId || hasAppliedDeactivation(record.deactivationApplication)) {
        return;
      }

      Modal.confirm({
        title: '确认离职注销',
        content: `确认对卡号 ${record.cardNo}（${record.employeeName}，员工编号 ${record.employeeNo}）提交离职注销申请吗？提交后申请注销状态将更新为「离职」并同步至飞码端触发注销流程，随后请线下将实体门禁卡交还给门禁卡管理员。`,
        okText: '确认提交',
        okButtonProps: { danger: true },
        cancelText: '取消',
        onOk: async () => {
          setSubmittingCardId(record.id);
          try {
            const result = await runApplyDeactivation(record.id, {
              deactivationApplication: DEFAULT_DEACTIVATION_APPLICATION,
            });
            setLatestDeactivationResult(result);
            messageApi.success(
              '离职注销申请提交成功，请线下将实体门禁卡交还门禁卡管理员',
            );
            await actionRef.current?.reload();
          } catch (error) {
            const code = resolveErrorCode(error);
            messageApi.error(
              resolveErrorMessage(
                error,
                '离职注销申请提交失败，请稍后重试',
                APPLY_DEACTIVATION_ERROR_MESSAGES,
              ),
            );
            if (code === 'NOT_FOUND' || code === 'INVALID_STATE') {
              await actionRef.current?.reload();
            }
          } finally {
            setSubmittingCardId('');
          }
        },
      });
    },
    [messageApi, runApplyDeactivation, submittingCardId],
  );

  /** 返回首页（目标页面 main → /page/main） */
  const handleBackToMain = useCallback(() => {
    navigate(BACK_HOME_PATH);
  }, [navigate]);

  const columns: ProColumns<AccessCardItem>[] = [
    {
      title: '姓名',
      dataIndex: 'employeeName',
      ellipsis: true,
      width: 100,
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
      width: 140,
    },
    {
      title: '权限状态',
      dataIndex: 'permissionStatus',
      width: 100,
      render: (_, record) => (
        <Tag
          color={record.permissionStatus === PERMISSION_STATUS_IN_USE ? 'success' : 'default'}
        >
          {record.permissionStatus}
        </Tag>
      ),
    },
    {
      title: '申请注销',
      dataIndex: 'deactivationApplication',
      width: 110,
      render: (_, record) =>
        hasAppliedDeactivation(record.deactivationApplication) ? (
          <Tag color='warning'>{record.deactivationApplication}</Tag>
        ) : (
          <span style={{ color: '#8c9bab' }}>未申请</span>
        ),
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        const applied = hasAppliedDeactivation(record.deactivationApplication);
        return [
          <Button
            key='apply-deactivation'
            type='link'
            danger={!applied}
            data-action-id='apply_deactivation'
            icon={<LogoutOutlined />}
            loading={submittingCardId === record.id}
            disabled={
              applied || (Boolean(submittingCardId) && submittingCardId !== record.id)
            }
            onClick={() => handleApplyDeactivation(record)}
          >
            {applied ? '已申请离职' : '离职注销'}
          </Button>,
        ];
      },
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
            title='门禁卡退还'
            subTitle='核对本人名下使用中的门禁卡信息，发起离职注销后数据将实时同步至飞码端门禁卡管理系统触发注销流程'
            style={{ padding: '8px 0 0' }}
          />
        </ProCard>

        <div style={{ position: 'relative', padding: '24px 16px 0' }}>
          {latestDeactivationResult ? (
            <ProCard
              bordered
              style={{
                marginBottom: 16,
                borderRadius: 12,
                borderColor: '#b7eb8f',
                background: '#f6ffed',
              }}
              bodyStyle={{ padding: '14px 16px' }}
            >
              <Alert
                type='success'
                showIcon
                icon={<CheckCircleFilled />}
                closable
                onClose={() => setLatestDeactivationResult(null)}
                style={{ border: 'none', background: 'transparent', padding: 0 }}
                message={
                  <span style={{ fontWeight: 600, color: '#135200' }}>
                    离职注销申请已提交并同步飞码端
                  </span>
                }
                description={
                  <div style={{ marginTop: 8 }}>
                    <div style={{ color: '#237804', marginBottom: 8 }}>
                      请线下将实体门禁卡交还至综合事务室门禁卡管理员，后续注销审批流程由飞码端门禁卡管理系统承接处理。
                    </div>
                    <Descriptions
                      column={{ xs: 1, sm: 2, md: 3 }}
                      size='small'
                      colon
                      labelStyle={{ color: '#5a6b82' }}
                      contentStyle={{ color: '#0f2540', fontWeight: 500 }}
                    >
                      <Descriptions.Item label='姓名'>
                        {latestDeactivationResult.employeeName}
                      </Descriptions.Item>
                      <Descriptions.Item label='员工编号'>
                        {latestDeactivationResult.employeeNo}
                      </Descriptions.Item>
                      <Descriptions.Item label='卡号'>
                        {latestDeactivationResult.cardNo}
                      </Descriptions.Item>
                      <Descriptions.Item label='权限状态'>
                        <Tag color='success'>
                          {latestDeactivationResult.permissionStatus}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label='申请注销'>
                        <Tag color='warning'>
                          {latestDeactivationResult.deactivationApplication}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                }
              />
            </ProCard>
          ) : null}

          <ProTable<AccessCardItem>
            rowKey={ROW_KEY}
            actionRef={actionRef}
            loading={listLoading}
            columns={columns}
            cardBordered
            ghost={false}
            search={false}
            options={false}
            scroll={{ x: 700 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description='暂无本人名下使用中的门禁卡记录'
                />
              ),
            }}
            request={async (params) => {
              const current = params.current ?? DEFAULT_CURRENT;
              const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
              try {
                const res = await runListAccessCards({ current, pageSize });
                const list = Array.isArray(res?.list) ? res.list : [];
                setLoadError('');
                return {
                  data: list,
                  total: res?.total ?? 0,
                  current: res?.current ?? current,
                  pageSize: res?.pageSize ?? pageSize,
                  success: true,
                };
              } catch (error) {
                setLoadError(
                  resolveErrorMessage(error, '使用中门禁卡列表加载失败，请稍后重试'),
                );
                return { data: [], total: 0, success: false };
              }
            }}
            pagination={{
              defaultPageSize: DEFAULT_PAGE_SIZE,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            headerTitle={
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0f2540' }}>
                使用中门禁卡
              </span>
            }
          />

          {loadError ? (
            <div style={{ marginTop: 12 }}>
              <Alert
                type='error'
                showIcon
                message='门禁卡加载失败'
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
              message='同步说明：提交离职注销后，门禁卡申请注销状态将更新为「离职」并实时同步回传至飞码端门禁卡管理系统发起注销流程；请线下将实体门禁卡交还给门禁卡管理员。'
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              block
              icon={<HomeOutlined />}
              data-action-id='back_to_main'
              style={{
                height: 44,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                borderColor: 'rgba(22, 119, 255, 0.32)',
                color: PRIMARY_DEEP_COLOR,
                fontWeight: 600,
              }}
              onClick={handleBackToMain}
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
