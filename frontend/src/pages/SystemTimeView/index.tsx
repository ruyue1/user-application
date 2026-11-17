import { useCallback } from 'react';
import { useRequest } from 'ahooks';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, Empty, Space, Spin, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { getCurrentTime } from '@/apis/systemTimeContractApi';

/** 时间获取失败的面向用户提示（不暴露后端堆栈或内部错误细节）。 */
const TIME_ERROR_MESSAGE = '时间获取失败';
const TIME_ERROR_DESCRIPTION = '未能从后端获取系统当前时间，请点击“刷新时间”重试。';

/**
 * 系统时间展示页（pageKey: SystemTimeView）。
 *
 * 页面加载后自动调用 system_time_contract.get_current_time 获取后端系统当前时间，
 * 并以文本形式展示返回的 currentTime；点击“刷新时间”再次获取并更新展示；
 * 请求进行中按钮进入 loading 态避免重复触发；请求失败时展示失败提示并保留刷新按钮。
 */
export default function SystemTimeView() {
  const { data, loading, error, run } = useRequest(getCurrentTime, { manual: false });

  const handleRefresh = useCallback(() => {
    if (loading) return;
    run();
  }, [loading, run]);

  const currentTime = data?.currentTime;

  const renderContent = () => {
    if (loading && !currentTime) {
      return (
        <Space direction='vertical' align='center' size={12} style={{ width: '100%', padding: '40px 0' }}>
          <Spin size='large' />
          <Typography.Text type='secondary'>正在获取后端系统时间…</Typography.Text>
        </Space>
      );
    }

    if (currentTime) {
      return (
        <Space direction='vertical' size={8}>
          <Typography.Text type='secondary'>后端系统当前时间（精确到秒）</Typography.Text>
          <Typography.Title level={2} style={{ margin: 0 }}>
            {currentTime}
          </Typography.Title>
        </Space>
      );
    }

    if (error) {
      return null;
    }

    return <Empty description='暂无时间数据' />;
  };

  return (
    <PageContainer header={{ title: '系统时间展示', subTitle: '查看后端系统当前时间' }}>
      <ProCard
        title='后端系统当前时间'
        bordered
        extra={
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            loading={loading}
            disabled={loading}
            onClick={handleRefresh}
          >
            刷新时间
          </Button>
        }
      >
        {error && !loading ? (
          <Alert
            type='error'
            showIcon
            message={TIME_ERROR_MESSAGE}
            description={TIME_ERROR_DESCRIPTION}
            style={{ marginBottom: 16 }}
          />
        ) : null}
        {renderContent()}
      </ProCard>
    </PageContainer>
  );
}
