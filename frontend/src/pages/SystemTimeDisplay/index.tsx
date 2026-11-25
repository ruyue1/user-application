import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Space, Typography } from 'antd';

/** 刷新间隔（毫秒），保证页面停留在秒级时间精度 */
const CLOCK_REFRESH_INTERVAL = 1000;

/** 补零，保证时间各段固定两位数 */
const pad = (value: number): string => String(value).padStart(2, '0');

/** 将日期格式化为 YYYY-MM-DD HH:mm:ss，供页面只读展示系统时间 */
const formatSystemTime = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`;

/**
 * 系统时间展示页：只读呈现当前系统时间，不提供编辑、提交、搜索、筛选或分页。
 */
const SystemTimeDisplay = () => {
  const [systemTime, setSystemTime] = useState<Date>(() => new Date());

  // 定时同步系统时间，组件卸载时清理定时器避免资源泄漏
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSystemTime(new Date());
    }, CLOCK_REFRESH_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <ProCard title="系统时间" bordered>
      <Space direction="vertical" size={8}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {formatSystemTime(systemTime)}
        </Typography.Title>
        <Typography.Text type="secondary">当前系统时间仅供查看，页面不提供编辑或提交操作。</Typography.Text>
      </Space>
    </ProCard>
  );
};

export default SystemTimeDisplay;
