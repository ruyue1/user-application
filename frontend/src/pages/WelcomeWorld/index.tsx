import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Empty, Result, Skeleton, Typography } from 'antd';
import { getWelcomeWorld } from '@/apis/greetingMessageContractApi';

const { Title } = Typography;

export const WelcomeWorld: React.FC = () => {
  const { data, loading, error, refresh } = useRequest(getWelcomeWorld);
  const greetingText = data?.greetingText?.trim();

  return (
    <PageContainer title="欢迎世界页">
      <ProCard
        title="欢迎世界"
        headerBordered
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={refresh}
            loading={loading}
          >
            刷新
          </Button>
        }
      >
        {loading && !data ? (
          <div style={{ padding: '48px 24px' }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ) : error ? (
          <Result
            status="error"
            title="获取欢迎世界问候语失败"
            subTitle={error.message || '请求欢迎世界问候接口异常，请稍后重试。'}
            extra={
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={refresh}
              >
                重试
              </Button>
            }
          />
        ) : greetingText ? (
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              {greetingText}
            </Title>
          </div>
        ) : (
          <Empty
            description="暂无欢迎世界问候内容"
            style={{ padding: '48px 0' }}
          >
            <Button type="primary" onClick={refresh}>
              重新加载
            </Button>
          </Empty>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default WelcomeWorld;
