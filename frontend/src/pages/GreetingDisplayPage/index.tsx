import { Button, Result, Spin, Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getGreeting } from '@/apis/greetingContractApi';

const { Title } = Typography;

/** 问候展示页：加载后自动获取问候语并居中展示，请求中展示加载提示，失败展示异常提示。 */
export default function GreetingDisplayPage() {
  const { data, loading, error, refresh } = useRequest(getGreeting);

  /** 请求成功且返回问候字符串时居中展示。 */
  const renderContent = () => {
    if (loading) {
      return <Spin tip="加载中..." />;
    }

    if (error) {
      return (
        <Result
          status="error"
          title="问候语加载失败"
          subTitle="请稍后重试"
          extra={
            <Button type="primary" onClick={() => refresh()}>
              重试
            </Button>
          }
        />
      );
    }

    return <Title level={2}>{data?.message ?? ''}</Title>;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: 24,
      }}
    >
      {renderContent()}
    </div>
  );
}
