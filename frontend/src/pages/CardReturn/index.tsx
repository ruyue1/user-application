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
  type AccessCardItem,
  type AccessCardPage,
  type DeactivationSubmissionResult,
  listDeactivationSubmissions,
  submitDeactivation,
} from '@/apis/contractDeactivationSubmissionApi';

/** 页面主题色：蓝色调扁平化风格 */
const PRIMARY_COLOR = '#1677ff';
const PRIMARY_DEEP_COLOR = '#0b4fc4';

/** 返回首页的目标路由（页面 path: main → /page/main） */
const BACK_HOME_PATH = '/page/main';

/** 默认每页条数 */
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = ['10', '20', '50'];

/** 表格行标识 */
const ROW_KEY = 'id';

/** 门禁卡权限状态取值（API Contract 枚举） */
const PERMISSION_STATUS_IN_USE = '使用中';

/** 同步状态取值（API Contract 枚举） */
const SYNC_STATUS_SUCCESS = '已同步';

/** 查询列表错误码 → 页面提示（与 API Contract error_codes 一致） */
const LIST_ERROR_MESSAGES: Record<string, string> = {
  INVALID_PARAMETER: '分页参数不合法，请刷新页面后重试',
};

/** 提交注销错误码 → 页面提示（与 API Contract error_codes 一致） */
const SUBMIT_ERROR_MESSAGES: Record<string, string> = {
  INVALID_PARAMETER: '提交参数不合法，请刷新列表后重新选择门禁卡',
  NOT_FOUND: '未找到该门禁卡，请刷新列表后重试',
  INVALID_STATE: '该门禁卡当前不处于使用中状态，无法提交离职注销申请',
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
 * 从请求异常中提取接口错误码（如 INVALID_PARAMETER / NOT_FOUND / INVALID_STATE）。
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
  errorMessages: Record<string, string>,
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
 * 是否为离职注销已提交的完成态（含 409 INVALID_STATE 的幂等重试场景）。
 */
function isAlreadySubmitted(error: unknown): boolean {
  return resolveErrorCode(error) === 'INVALID_STATE';
}

/** 提交时间格式化：兼容 date-time 与常见时间字符串 */
function formatSubmittedAt(value?: string): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (num: number) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * 门禁卡归还页面（pageId: card_return）
 *
 * - 初始加载、翻页与页大小变化时调用 contract_deactivation_submission.list 查询本人使用中门禁卡
 * - 表格展示姓名、员工编号、卡号、权限状态，行主键为 id，每行提供「离职注销」操作
 * - 点击离职注销后二次确认，确认后调用 contract_deactivation_submission.submit_deactivation 提交
 * - 提交成功后本页切换为已完成界面，提示员工线下将实体卡交还门禁卡管理员，并可返回首页
 */
export default function CardReturn() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  /** 列表请求失败提示，失败时可重试 */
  const [loadError, setLoadError] = useState('');
  /** 正在提交注销的门禁卡主键，用于行按钮 loading 与防重复提交 */
  const [submittingCardId, setSubmittingCardId] = useState('');
  /** 提交成功后的完成态结果 */
  const [submitResult, setSubmitResult] = useState<DeactivationSubmissionResult | null>(null);
  /**
   * 重复提交（INVALID_STATE）时的降级完成态：仅使用列表已返回的卡片信息，
   * 不虚构服务端返回的注销状态字段，缺失字段以占位符展示
   */
  const [submittedCard, setSubmittedCard] = useState<AccessCardItem | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // 提交结果要写入 state，run 返回 void，这里必须用 runAsync 拿到返回值。
  const { runAsync: runSubmitDeactivation } = useRequest(submitDeactivation, { manual: true });

  /** 列表请求：分页查询本人使用中门禁卡；current / pageSize 为契约必填分页参数 */
  const fetchPage = useCallback(
    async (params: { current: number; pageSize: number }): Promise<AccessCardPage> =>
      listDeactivationSubmissions({
        current: Math.max(1, params.current),
        pageSize: Math.max(1, params.pageSize),
      }),
    [],
  );

  /** 提交离职注销：二次确认后提交，失败按错误码提示并保留列表状态 */
  const handleApplyDeactivation = useCallback(
    (record: AccessCardItem) => {
      if (submittingCardId) return;

      Modal.confirm({
        title: '确认离职注销',
        content: `确认对卡号 ${record.cardNo}（${record.employeeName}）发起离职注销申请吗？提交后将同步至飞码端并发起注销流程。`,
        okText: '确认注销',
        okButtonProps: { danger: true },
        cancelText: '取消',
        onOk: async () => {
          setSubmittingCardId(record.id);
          try {
            const result = await runSubmitDeactivation({ cardId: record.id });
            setSubmitResult(result);
            messageApi.success('离职注销申请已提交');
            return;
          } catch (error) {
            if (isAlreadySubmitted(error)) {
              // 该卡已提交过注销申请（状态不再是使用中）：直接进入完成界面，避免重复提交
              setSubmittedCard(record);
              messageApi.success('该门禁卡已完成离职注销申请的提交');
              return;
            }
            messageApi.error(
              resolveErrorMessage(error, '离职注销提交失败，请稍后重试', SUBMIT_ERROR_MESSAGES),
            );
            await actionRef.current?.reload();
          } finally {
            setSubmittingCardId('');
          }
        },
      });
    },
    [messageApi, runSubmitDeactivation, submittingCardId],
  );

  /** 返回首页 */
  const handleBackHome = useCallback(() => {
    navigate(BACK_HOME_PATH);
  }, [navigate]);

  const columns: ProColumns<AccessCardItem>[] = [
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
      width: 140,
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
      ellipsis: true,
      width: 150,
    },
    {
      title: '权限状态',
      dataIndex: 'permissionStatus',
      width: 110,
      render: (_, record) => (
        <Tag color={record.permissionStatus === PERMISSION_STATUS_IN_USE ? 'success' : 'default'}>
          {record.permissionStatus}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      fixed: 'right',
      width: 110,
      render: (_, record) => [
        <Button
          key='apply-deactivation'
          type='link'
          danger
          data-action-id='apply_deactivation-control'
          icon={<LogoutOutlined />}
          loading={submittingCardId === record.id}
          disabled={Boolean(submittingCardId) && submittingCardId !== record.id}
          onClick={() => handleApplyDeactivation(record)}
        >
          离职注销
        </Button>,
      ],
    },
  ];

  /** 完成态展示数据：优先使用提交接口返回结果，重复提交时回退到列表卡片信息 */
  const completedInfo = submitResult
    ? {
        employeeName: submitResult.employeeName,
        employeeNo: submitResult.employeeNo,
        cardNo: submitResult.cardNo,
        deactivationApply: submitResult.deactivationApply as string,
        syncStatus: submitResult.syncStatus as string,
        submittedAt: submitResult.submittedAt,
      }
    : submittedCard
      ? {
          employeeName: submittedCard.employeeName,
          employeeNo: submittedCard.employeeNo,
          cardNo: submittedCard.cardNo,
          deactivationApply: '',
          syncStatus: '',
          submittedAt: '',
        }
      : null;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      {contextHolder}
      <div style={pageStyle}>
        {completedInfo ? (
          /** 已完成界面：展示提交结果并提示线下归还实体卡 */
          <div style={{ position: 'relative', padding: '24px 16px 0' }}>
            <ProCard
              ghost
              style={{ background: 'transparent' }}
              bodyStyle={{ padding: 0 }}
            >
              <Result
                icon={<CheckCircleFilled style={{ color: PRIMARY_COLOR, fontSize: 56 }} />}
                title='注销申请已提交'
                subTitle='请将实体门禁卡线下交还至门禁卡管理员，由飞码端继续承接后续注销流程。'
                style={{ padding: '8px 0 0' }}
              />
            </ProCard>

            <ProCard
              title='注销申请信息'
              bordered
              style={{ marginTop: 16, borderRadius: 12 }}
            >
              <Descriptions
                column={1}
                size='small'
                colon={false}
                labelStyle={{ width: 110, color: '#5a6b82' }}
                contentStyle={{ color: '#0f2540', fontWeight: 500 }}
              >
                <Descriptions.Item label='姓名'>{completedInfo.employeeName}</Descriptions.Item>
                <Descriptions.Item label='员工编号'>
                  {completedInfo.employeeNo}
                </Descriptions.Item>
                <Descriptions.Item label='卡号'>{completedInfo.cardNo}</Descriptions.Item>
                <Descriptions.Item label='申请注销'>
                  {completedInfo.deactivationApply ? (
                    <Tag color='error'>{completedInfo.deactivationApply}</Tag>
                  ) : (
                    '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='同步状态'>
                  {completedInfo.syncStatus ? (
                    <Tag
                      color={
                        completedInfo.syncStatus === SYNC_STATUS_SUCCESS ? 'success' : 'warning'
                      }
                    >
                      {completedInfo.syncStatus}
                    </Tag>
                  ) : (
                    '-'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='提交时间'>
                  {formatSubmittedAt(completedInfo.submittedAt)}
                </Descriptions.Item>
              </Descriptions>
            </ProCard>

            <div style={{ marginTop: 16 }}>
              <Alert
                type='info'
                showIcon
                message='请线下将实体门禁卡交还至门禁卡管理员，注销流程由飞码端统一处理。'
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <Button
                block
                type='primary'
                icon={<HomeOutlined />}
                data-action-id='back_home-control'
                style={{ height: 44, borderRadius: 10, fontWeight: 600 }}
                onClick={handleBackHome}
              >
                返回首页
              </Button>
            </div>

            <BottomDecoration />
          </div>
        ) : (
          <>
            <ProCard
              ghost
              style={{ background: 'transparent' }}
              bodyStyle={{ padding: '24px 16px 0' }}
            >
              <Result
                icon={<SafetyCertificateOutlined style={{ color: PRIMARY_COLOR }} />}
                title='门禁卡归还'
                subTitle='请核对本人名下使用中的门禁卡，确认后进行离职注销'
                style={{ padding: '8px 0 0' }}
              />
            </ProCard>

            <div style={{ position: 'relative', padding: '24px 16px 0' }}>
              <ProTable<AccessCardItem>
                rowKey={ROW_KEY}
                actionRef={actionRef}
                columns={columns}
                cardBordered
                ghost={false}
                search={false}
                options={false}
                scroll={{ x: 620 }}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description='暂无使用中的门禁卡'
                    />
                  ),
                }}
                request={async (params) => {
                  const current = params.current ?? 1;
                  const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
                  try {
                    const res = await fetchPage({ current, pageSize });
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
                      resolveErrorMessage(
                        error,
                        '服务暂时不可用，请稍后重试',
                        LIST_ERROR_MESSAGES,
                      ),
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
                  message='提示：提交离职注销后，申请注销字段将更新为离职并实时同步至飞码端门禁卡管理系统。'
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
          </>
        )}
      </div>
    </ConfigProvider>
  );
}
