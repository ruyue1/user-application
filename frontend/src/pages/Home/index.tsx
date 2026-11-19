import { useMemo } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Empty, Result, Skeleton, Space, Tag, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { readServerTime } from '@/apis/serverTimeContractApi';

/** 将后端返回的时间字符串格式化为清晰可读的展示文本；解析失败时原样展示后端返回值。 */
function formatServerTime(raw: string): { display: string; fallback: boolean } {
  const parsed = new Date(raw.replace(' ', 'T'));
  if (Number.isNaN(parsed.getTime())) {
    return { display: raw, fallback: true };
  }
  const pad = (value: number) => String(value).padStart(2, '0');
  const display = [
    `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`,
    `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`,
  ].join(' ');
  return { display, fallback: false };
}

/**
 * 服务器时间展示页。
 *
 * 页面初始加载时调用 server_time_contract.read_server_time（GET /api/server-time），
 * 读取响应体 currentTime 字段并展示后端服务器当前时间。
 */
export default function Home() {
  const { data, error, loading, run } = useRequest(readServerTime);

  const formatted = useMemo(() => {
    const raw = data?.currentTime;
    return typeof raw === 'string' ? formatServerTime(raw) : null;
  }, [data]);

  const hasTime = Boolean(formatted?.display);

  return (
    <PageContainer
      header={{
        title: '服务器时间',
        subTitle: '进入页面后自动读取后端服务器当前时间，用于确认前后端连通性',
      }}
      style={{ minHeight: '100%', background: '#91caff' }}
      childrenContentStyle={{ background: 'transparent' }}
    >
      <ProCard
        title='后端服务器当前时间'
        bordered
        extra={
          <Button icon={<ReloadOutlined />} loading={loading} onClick={() => run()}>
            刷新
          </Button>
        }
      >
        {loading && !hasTime ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : error ? (
          <Result
            status='error'
            title='服务器时间读取失败'
            subTitle={error.message || '请求后端服务器时间失败（INTERNAL_ERROR），请稍后重试。'}
            extra={
              <Button type='primary' onClick={() => run()}>
                重新获取
              </Button>
            }
          />
        ) : hasTime ? (
          <Space direction='vertical' size={12} style={{ width: '100%' }}>
            <Space align='center' size={12} wrap>
              <Typography.Title level={2} style={{ margin: 0 }}>
                {formatted?.display}
              </Typography.Title>
              <Tag color='green'>获取成功</Tag>
            </Space>
            <Typography.Text type='secondary'>
              后端原始返回：{data?.currentTime}
              {formatted?.fallback ? '（格式无法本地解析，已原样展示）' : ''}
            </Typography.Text>
          </Space>
        ) : (
          <Empty description='暂未获取到服务器时间' />
        )}
      </ProCard>
    </PageContainer>
  );
}
