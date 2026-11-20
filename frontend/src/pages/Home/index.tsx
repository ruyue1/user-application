import { useMemo } from 'react';
import { useRequest } from 'ahooks';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, Empty, Skeleton, Typography } from 'antd';
import { getGreeting } from '@/apis/greetingContractApi';

const FALLBACK_CONTENT = '问候语暂时无法获取，请稍后重试';

export default function Home() {
  // 页面初始加载时自动调用，页面刷新时重新调用
  const { data, loading, error, refresh } = useRequest(getGreeting);

  // 读取响应体 content 字段；缺失或为空时按契约 error 缺失处理，展示兜底文案
  const greetingContent = useMemo(() => {
    const content = data?.content;
    if (typeof content !== 'string' || content.trim() === '') {
      return FALLBACK_CONTENT;
    }
    return content;
  }, [data]);

  return (
    <PageContainer
      header={{
        title: '欢迎页',
      }}
    >
      <ProCard
        title='今日问候'
        wrap
        extra={
          <Button size='small' onClick={() => refresh()} loading={loading}>
            刷新
          </Button>
        }
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
        ) : (
          <>
            {error ? (
              <Alert
                style={{ marginBottom: 16 }}
                type='error'
                showIcon
                message='问候语加载失败'
                description='请检查网络连接后重试。'
                action={
                  <Button size='small' type='primary' onClick={() => refresh()}>
                    重试
                  </Button>
                }
              />
            ) : null}
            {data?.content?.trim() ? (
              <Typography.Title level={2} style={{ margin: 0 }}>
                {greetingContent}
              </Typography.Title>
            ) : (
              <Empty description={greetingContent} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </>
        )}
      </ProCard>
    </PageContainer>
  );
}
