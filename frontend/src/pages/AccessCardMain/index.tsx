import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import {
  CreditCardOutlined,
  RollbackOutlined,
  CarOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { getGreeting } from '@/apis/greetingContractApi';
import {
  listAccessCardApplications,
  type AccessCardApplicationPage,
} from '@/apis/accessCardApplicationContractApi';
import { listAccessCards, type AccessCardPageResponse } from '@/apis/accessCardContractApi';
import { listCardAdmins } from '@/apis/cardAdminContractApi';
import { useIdentity } from '@/platform/identity/useIdentity';

/** 门禁卡领用页面路由 */
const CARD_CLAIM_PATH = '/page/card-claim';
/** 门禁卡归还页面路由 */
const CARD_RETURN_PATH = '/page/card-return';
/** 领用明细默认分页大小 */
const APPLICATION_PAGE_SIZE = 10;
/** 门禁卡默认分页大小 */
const ACCESS_CARD_PAGE_SIZE = 10;
/** 出差卡占位功能提示文案 */
const TRIP_NOT_AVAILABLE_TIP = '暂不提供';
/** 未识别到扫码人时使用的领签人标识，接口照常调用并由后端返回本人名下数据 */
const FALLBACK_CLAIMER_ID = '';

/**
 * 门禁卡管理主页面
 *
 * 顶部居中标题、中部四个纵向矩形功能按钮、底部装饰图形；
 * 页面加载时仅调用 PageImplementationContract 声明的四个接口。
 */
export default function AccessCardMain() {
  const navigate = useNavigate();
  const { identity } = useIdentity();

  const greetingRequest = useRequest(getGreeting);

  const applicationRequest = useRequest(
    () =>
      listAccessCardApplications({
        claimerId: identity?.userId || FALLBACK_CLAIMER_ID,
        current: 1,
        pageSize: APPLICATION_PAGE_SIZE,
      }),
    { ready: Boolean(identity?.userId) },
  );

  const accessCardRequest = useRequest(() =>
    listAccessCards({ current: 1, pageSize: ACCESS_CARD_PAGE_SIZE }),
  );

  const cardAdminRequest = useRequest(listCardAdmins);

  const greetingContent = greetingRequest.data?.content?.trim() || '';
  const applicationPage: AccessCardApplicationPage | undefined = applicationRequest.data;
  const accessCardPage: AccessCardPageResponse | undefined = accessCardRequest.data;
  const adminList = cardAdminRequest.data?.list;

  const hasLoadError = useMemo(
    () =>
      Boolean(
        greetingRequest.error ||
          applicationRequest.error ||
          accessCardRequest.error ||
          cardAdminRequest.error,
      ),
    [
      greetingRequest.error,
      applicationRequest.error,
      accessCardRequest.error,
      cardAdminRequest.error,
    ],
  );

  const retryAll = () => {
    greetingRequest.refresh();
    if (identity?.userId) {
      applicationRequest.refresh();
    }
    accessCardRequest.refresh();
    cardAdminRequest.refresh();
  };

  const goClaim = () => {
    navigate(CARD_CLAIM_PATH);
  };

  const goReturn = () => {
    navigate(CARD_RETURN_PATH);
  };

  return (
    <PageContainer
      header={{ title: '门禁卡管理' }}
      content={greetingContent ? greetingContent : undefined}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 24,
        }}
      >
        <div style={{ width: '100%', maxWidth: 560 }}>
          <ProCard
            bordered={false}
            boxShadow
            style={{
              borderRadius: 16,
              background: 'linear-gradient(160deg, #e8f2ff 0%, #ffffff 55%)',
            }}
            bodyStyle={{ padding: '32px 24px 24px' }}
          >
            <Typography.Title
              level={3}
              style={{ textAlign: 'center', color: '#1d39c4', marginBottom: 8 }}
            >
              成都中心门禁卡管理系统
            </Typography.Title>
            {greetingContent ? (
              <Typography.Paragraph
                style={{ textAlign: 'center', color: '#597ef7', marginBottom: 0 }}
              >
                {greetingContent}
              </Typography.Paragraph>
            ) : null}

            {hasLoadError ? (
              <Alert
                style={{ marginTop: 16 }}
                type='warning'
                showIcon
                message='部分数据加载失败'
                description='请检查网络连接后重试，功能入口仍可正常使用。'
                action={
                  <Button size='small' type='primary' onClick={retryAll}>
                    重试
                  </Button>
                }
              />
            ) : null}

            <Space direction='vertical' size={16} style={{ width: '100%', marginTop: 24 }}>
              <Button
                type='primary'
                block
                size='large'
                icon={<CreditCardOutlined />}
                onClick={goClaim}
                loading={applicationRequest.loading}
                style={{ height: 56, borderRadius: 8, fontSize: 16 }}
              >
                门禁卡领用
              </Button>
              <Button
                type='primary'
                block
                size='large'
                icon={<RollbackOutlined />}
                onClick={goReturn}
                loading={accessCardRequest.loading}
                style={{ height: 56, borderRadius: 8, fontSize: 16 }}
              >
                门禁卡归还
              </Button>
              <Tooltip title={TRIP_NOT_AVAILABLE_TIP}>
                <Button
                  block
                  size='large'
                  disabled
                  icon={<CarOutlined />}
                  style={{ height: 56, borderRadius: 8, fontSize: 16 }}
                >
                  出差卡借用
                  <Tag style={{ marginLeft: 8 }}>{TRIP_NOT_AVAILABLE_TIP}</Tag>
                </Button>
              </Tooltip>
              <Tooltip title={TRIP_NOT_AVAILABLE_TIP}>
                <Button
                  block
                  size='large'
                  disabled
                  icon={<InboxOutlined />}
                  style={{ height: 56, borderRadius: 8, fontSize: 16 }}
                >
                  出差卡归还
                  <Tag style={{ marginLeft: 8 }}>{TRIP_NOT_AVAILABLE_TIP}</Tag>
                </Button>
              </Tooltip>
            </Space>

            <div
              style={{
                marginTop: 24,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              <Tag color='blue'>{`待领签：${applicationPage?.total ?? 0}`}</Tag>
              <Tag color='geekblue'>{`使用中：${accessCardPage?.total ?? 0}`}</Tag>
              <Tag color='cyan'>{`交卡联系人：${adminList?.length ?? 0}`}</Tag>
            </div>

            {applicationRequest.loading || accessCardRequest.loading || cardAdminRequest.loading ? (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Spin size='small' />
              </div>
            ) : null}

            {adminList?.length ? (
              <Typography.Paragraph
                style={{ textAlign: 'center', color: '#8c8c8c', marginTop: 16, marginBottom: 0 }}
              >
                {adminList
                  .slice(0, 2)
                  .map((admin) => `${admin.region} ${admin.adminName}/${admin.adminNo}`)
                  .join(' · ')}
              </Typography.Paragraph>
            ) : null}

            {/* 底部装饰：高楼大厦与柱状图 */}
            <div
              aria-hidden
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 10,
                height: 120,
              }}
            >
              {[54, 82, 40, 104, 68].map((height, index) => (
                <div
                  key={height}
                  style={{
                    width: 26,
                    height,
                    borderRadius: '4px 4px 0 0',
                    background:
                      index % 2 === 0
                        ? 'linear-gradient(180deg, #69b1ff 0%, #1677ff 100%)'
                        : 'linear-gradient(180deg, #91caff 0%, #4096ff 100%)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 3,
                      padding: '6px 4px',
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, cell) => (
                      <span
                        key={cell}
                        style={{
                          height: 4,
                          borderRadius: 1,
                          background: 'rgba(255,255,255,0.75)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 6,
                  height: 104,
                  marginLeft: 8,
                }}
              >
                {[36, 70, 52, 92].map((height) => (
                  <div
                    key={height}
                    style={{
                      width: 12,
                      height,
                      borderRadius: 3,
                      background: 'rgba(22,119,255,0.45)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              aria-hidden
              style={{ height: 4, borderRadius: 2, background: '#1677ff', marginTop: 4 }}
            />
          </ProCard>
        </div>
      </div>
    </PageContainer>
  );
}
