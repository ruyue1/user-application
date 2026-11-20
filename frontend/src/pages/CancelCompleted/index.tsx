import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, Flex, Skeleton, Space, Tag, Typography } from 'antd';
import {
  CheckCircleFilled,
  CreditCardOutlined,
  HomeOutlined,
  IdcardOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { listCardAdmins, type CardAdmin, type CardAdminRegion } from '@/apis/cardAdminContractApi';

/**
 * 门禁卡管理主页面路由。
 * 与 constants/routes 中登记的 path（access_card_main）经 pageRouteSegmentFromPath
 * 转换后得到的访问路径保持一致，仅用于页面内跳转，不注册路由。
 */
const ACCESS_CARD_MAIN_PATH = '/page/access-card-main';
/** 按产品要求展示的交卡联系人区域顺序 */
const CARD_ADMIN_REGION_ORDER: CardAdminRegion[] = ['园区', 'OCG'];
/** 底部功能图标区配置 */
const FOOTER_FEATURES = [
  { key: 'claim', label: '门禁卡领用', icon: <IdcardOutlined /> },
  { key: 'return', label: '门禁卡退还', icon: <CreditCardOutlined /> },
  { key: 'home', label: '返回首页', icon: <HomeOutlined /> },
  { key: 'sync', label: '同步飞码', icon: <SyncOutlined /> },
] as const;

/** 交卡联系人文案，形如「园区李媛/WS04462」 */
function formatCardAdmin(admin: CardAdmin): string {
  return `${admin.region}${admin.adminName}/${admin.adminNo}`;
}

/** 按「园区 → OCG → 其他」区域顺序排序交卡联系人 */
function sortCardAdmins(list: CardAdmin[]): CardAdmin[] {
  const regionRank = (region: string) => {
    const index = CARD_ADMIN_REGION_ORDER.indexOf(region as CardAdminRegion);
    return index === -1 ? CARD_ADMIN_REGION_ORDER.length : index;
  };
  return [...list].sort((a, b) => regionRank(a.region) - regionRank(b.region));
}

/**
 * 注销完成页面
 *
 * 页面初始加载（含刷新）时调用 listCardAdmins 读取门禁卡管理员列表并展示交卡联系人，
 * 居中展示注销完成标题与交卡说明，提供蓝色【返回首页】按钮跳转门禁卡管理主页面，
 * 底部为功能图标区。管理员列表加载中展示骨架屏，加载失败时以静态联系人文案降级展示，
 * 不改变已确定的交互与跳转行为。
 */
export default function CancelCompleted() {
  const navigate = useNavigate();

  /** 页面初始加载与刷新时读取门禁卡管理员列表 */
  const { data: cardAdminData, loading, error, refresh } = useRequest(listCardAdmins);

  const cardAdmins = useMemo<CardAdmin[]>(
    () => sortCardAdmins(cardAdminData?.list ?? []),
    [cardAdminData],
  );

  const handleBackHome = () => {
    navigate(ACCESS_CARD_MAIN_PATH);
  };

  const handleRetry = () => {
    refresh();
  };

  /** 加载中：展示骨架屏；失败：提示并可重试；成功：逐条列示交卡联系人 */
  const renderContactContent = () => {
    if (loading) {
      return (
        <Flex
          vertical
          gap={10}
          align='center'
          style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}
        >
          <Skeleton active title={false} paragraph={{ rows: 2, width: ['80%', '60%'] }} />
        </Flex>
      );
    }

    if (error) {
      return (
        <Space direction='vertical' size={12} style={{ width: '100%' }}>
          <Alert
            type='error'
            showIcon
            message='门禁卡管理员信息加载失败'
            description='请联系综合事务室值班管理员线下交还实体卡，或点击重试重新加载。'
            action={
              <Button size='small' type='primary' onClick={handleRetry}>
                重试
              </Button>
            }
          />
          <Typography.Text style={{ fontSize: 16, color: '#1d39c4' }}>
            请把实体卡交给门禁卡管理员
          </Typography.Text>
        </Space>
      );
    }

    if (!cardAdmins.length) {
      return (
        <Space direction='vertical' size={12} style={{ width: '100%' }}>
          <Typography.Text style={{ fontSize: 16, color: '#1d39c4' }}>
            请把实体卡交给门禁卡管理员
          </Typography.Text>
          <Typography.Text type='secondary'>暂未获取到门禁卡管理员信息，请联系综合事务室。</Typography.Text>
        </Space>
      );
    }

    return (
      <Space direction='vertical' size={12} style={{ width: '100%' }}>
        {cardAdmins.map((admin) => (
          <Flex
            key={admin.id}
            justify='center'
            align='center'
            gap={8}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              background: '#f0f6ff',
              border: '1px solid #d6e4ff',
            }}
          >
            <Tag color='blue' style={{ marginInlineEnd: 0 }}>
              {admin.region}
            </Tag>
            <Typography.Text style={{ fontSize: 16, color: '#1d39c4', fontWeight: 500 }}>
              {formatCardAdmin(admin)}
            </Typography.Text>
          </Flex>
        ))}
      </Space>
    );
  };

  return (
    <PageContainer header={{ title: '已完成' }} breadcrumbRender={false}>
      <Flex vertical gap={16} style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <ProCard
          bordered={false}
          boxShadow
          style={{
            borderRadius: 16,
            background: 'linear-gradient(160deg, #e8f2ff 0%, #ffffff 60%)',
          }}
          bodyStyle={{ padding: '32px 20px' }}
        >
          <Flex vertical align='center' gap={12} style={{ textAlign: 'center' }}>
            <CheckCircleFilled style={{ fontSize: 56, color: '#1677ff' }} />
            <Typography.Title
              level={3}
              style={{ margin: 0, color: '#1d39c4', fontSize: 22 }}
            >
              您已完成注销申请！
            </Typography.Title>
            {renderContactContent()}
          </Flex>
        </ProCard>

        <ProCard bordered={false} boxShadow style={{ borderRadius: 16 }}>
          <Flex justify='center'>
            <Button
              type='primary'
              size='large'
              icon={<HomeOutlined />}
              onClick={handleBackHome}
              style={{
                height: 48,
                minWidth: 200,
                borderRadius: 8,
                fontSize: 16,
                backgroundColor: '#1677ff',
                borderColor: '#1677ff',
              }}
            >
              返回首页
            </Button>
          </Flex>
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
