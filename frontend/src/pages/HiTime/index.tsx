import { ProCard } from '@ant-design/pro-components';
import { Spin } from 'antd';
import { useRequest } from 'ahooks';

import { getTime } from '@/apis/systemTimeApi';

/**
 * 你好时间展示页
 *
 * 页面为免登录可访问的公开页面：
 * 1. 首屏固定展示问候字符串「你好」；
 * 2. 在「你好」正下方展示通过 GET /api/hi 获取的后端系统时间（按接口返回原样渲染）；
 * 3. 页面初始加载时即触发接口请求，加载中展示 loading，请求失败时不展示时间、问候内容仍然可用。
 */
export default function HiTime() {
  const { data, loading, error } = useRequest(getTime);

  const renderTime = () => {
    if (loading) {
      return <Spin size='small' />;
    }

    if (error) {
      return <span className='text-gray-400'>系统时间暂时无法获取，请稍后刷新重试</span>;
    }

    const currentTime = data?.current_time;

    if (!currentTime) {
      return <span className='text-gray-400'>暂无系统时间</span>;
    }

    return <span data-testid='system-time'>{currentTime}</span>;
  };

  return (
    <ProCard bordered>
      <div className='flex flex-col items-center gap-4 py-16'>
        <p className='text-2xl font-semibold text-gray-800'>你好</p>
        <div className='text-base text-gray-600'>{renderTime()}</div>
      </div>
    </ProCard>
  );
}
