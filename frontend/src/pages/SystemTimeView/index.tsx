import { useCallback, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { ProCard } from '@ant-design/pro-components';
import { Alert, Button, Empty, Space, Spin, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { getCurrentTime } from '@/apis/systemTimeContractApi';

/** 页面整体背景色：蓝色渐变（本轮需求要求页面整体背景为蓝色）。 */
const PAGE_BACKGROUND = 'linear-gradient(135deg, #0b3fa8 0%, #1677ff 48%, #55a8ff 100%)';

/** 时间获取失败的面向用户提示（不暴露后端堆栈或内部错误细节）。 */
const TIME_ERROR_TITLE = '时间获取失败';
const TIME_ERROR_DESCRIPTION = '未能从后端获取系统当前时间，请点击「刷新时间」重试。';

/** 匹配 ISO / 后端时间字符串中的「日期 + 时分秒」，用于统一成精确到秒的展示格式。 */
const DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}:\d{2}:\d{2})/;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * 将后端返回的时间字符串格式化为精确到秒的 `YYYY-MM-DD HH:mm:ss`。
 * 无法解析时原样返回后端字符串，保证展示内容与响应体一致。
 */
function formatToSecond(rawTime: string): string {
  const value = rawTime.trim();
  if (!value) return '';

  const matched = value.match(DATE_TIME_PATTERN);
  if (matched) {
    return `${matched[1]}-${matched[2]}-${matched[3]} ${matched[4]}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return [
    `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`,
    `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`,
  ].join(' ');
}

/**
 * 系统时间展示页（pageKey: SystemTimeView）。
 *
 * 页面加载后自动调用 system_time_contract.get_current_time 获取后端系统当前时间，
 * 并以文本形式展示响应体中的 currentTime（精确到秒）；
 * 点击「刷新时间」再次调用同一接口并更新展示，请求进行中按钮进入 loading 态避免重复触发；
 * 请求失败或响应缺失 currentTime 时展示时间获取失败提示，并保留刷新按钮用于重试。
 */
export default function SystemTimeView() {
  const { data, loading, error, run } = useRequest(getCurrentTime, { manual: false });

  const rawTime = data?.currentTime;
  const displayTime = useMemo(
    () => (typeof rawTime === 'string' ? formatToSecond(rawTime) : ''),
    [rawTime],
  );
  const hasTime = displayTime.length > 0;
  /** 请求异常，或请求成功但响应缺失 currentTime，均视为时间获取失败。 */
  const fetchFailed = Boolean(error) || (!loading && data !== undefined && !hasTime);

  const handleRefresh = useCallback(() => {
    if (loading) return;
    run();
  }, [loading, run]);

  const renderTimeContent = () => {
    if (fetchFailed) {
      return null;
    }

    if (loading && !hasTime) {
      return (
        <Space
          direction='vertical'
          align='center'
          size={12}
          style={{ width: '100%', padding: '40px 0' }}
        >
          <Spin size='large' />
          <Typography.Text type='secondary'>正在获取后端系统时间…</Typography.Text>
        </Space>
      );
    }

    if (hasTime) {
      return (
        <Space direction='vertical' size={4} style={{ width: '100%' }}>
          <Typography.Text type='secondary'>时间来源：后端系统，精确到秒</Typography.Text>
          <Typography.Title
            level={2}
            style={{
              margin: 0,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: 1,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {displayTime}
          </Typography.Title>
        </Space>
      );
    }

    return <Empty description='暂无时间数据' />;
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 56px)',
        width: '100%',
        padding: 24,
        boxSizing: 'border-box',
        background: PAGE_BACKGROUND,
      }}
    >
      <Space direction='vertical' size={16} style={{ width: '100%' }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0, color: '#ffffff' }}>
            系统时间展示
          </Typography.Title>
          <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            查看后端系统当前时间，可随时刷新重新获取
          </Typography.Text>
        </div>

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
          style={{
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(6, 34, 90, 0.24)',
          }}
        >
          {fetchFailed ? (
            <Alert
              type='error'
              showIcon
              message={TIME_ERROR_TITLE}
              description={TIME_ERROR_DESCRIPTION}
              style={{ marginBottom: 16 }}
            />
          ) : null}
          {renderTimeContent()}
        </ProCard>
      </Space>
    </div>
  );
}
