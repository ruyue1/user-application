import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Empty, Result, Spin, Typography } from 'antd';
import { getNoonGreeting } from '@/apis/greetingContractApi';

const { Title, Text } = Typography;

export default function NoonGreeting() {
  const { data, loading, error, refresh } = useRequest(getNoonGreeting);

  const greetingText = data?.noonGreetingText?.trim();

  return (
    <PageContainer title="午间问候页">
      <ProCard
        headerBordered
        title="问候语展示"
        bodyStyle={{
          minHeight: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Spin size="large" tip="加载中..." />
        ) : error ? (
          <Result
            status="error"
            title="问候语获取失败"
            subTitle={error.message || '请求午间问候语接口发生异常，请稍后重试。'}
            extra={
              <Button type="primary" onClick={refresh}>
                重新加载
              </Button>
            }
          />
        ) : greetingText ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              {greetingText}
            </Title>
            <Text type="secondary">祝您午间愉快</Text>
          </div>
        ) : (
          <Empty description="暂无问候语数据" />
        )}
      </ProCard>
    </PageContainer>
  );
}
