import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'] as const;

function padZero(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

interface ClockDisplay {
  dateText: string;
  timeText: string;
  weekdayText: string;
}

function formatClock(date: Date): ClockDisplay {
  return {
    dateText: `${date.getFullYear()} 年 ${padZero(date.getMonth() + 1)} 月 ${padZero(date.getDate())} 日`,
    timeText: `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`,
    weekdayText: `星期${WEEKDAY_LABELS[date.getDay()]}`,
  };
}

export default function Home() {
  const [current, setCurrent] = useState<Date>(() => new Date());
  const [show123, setShow123] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const timer = window.setInterval(() => {
        setCurrent(new Date());
      }, 1000);
      return () => {
        window.clearInterval(timer);
      };
    } catch (error) {
      setHasError(true);
      return undefined;
    }
  }, []);

  let clock: ClockDisplay | null = null;
  let clockError = false;
  try {
    clock = formatClock(current);
  } catch (error) {
    clockError = true;
  }

  // actionId: home_show_123（bindingType: local）——纯客户端逻辑，立即展示 123，不调用任何后端接口
  const handleShow123 = () => {
    try {
      setShow123(true);
    } catch (error) {
      setHasError(true);
    }
  };

  if (hasError || clockError) {
    return (
      <ProCard ghost bordered={false} className="w-full">
        <div
          className="flex w-full flex-col items-center justify-center"
          style={{ minHeight: 420 }}
        >
          <Alert
            type="error"
            showIcon
            message="页面出现异常"
            description="页面暂时无法正常显示，请刷新页面后重试。"
          />
        </div>
      </ProCard>
    );
  }

  const { dateText, timeText, weekdayText } = clock as ClockDisplay;

  return (
    <ProCard ghost bordered={false} className="w-full">
      <div
        className="flex w-full flex-col items-center justify-center"
        style={{ minHeight: 420 }}
      >
        <span className="mb-6 text-base text-gray-500">当前系统时间</span>
        <div
          className="font-mono font-semibold tabular-nums text-gray-900"
          style={{ fontSize: 72, lineHeight: 1.2, letterSpacing: 4 }}
        >
          {timeText}
        </div>
        <div className="mt-4 text-xl text-gray-700">
          {dateText}
          <span className="ml-4">{weekdayText}</span>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <Button type="primary" size="large" onClick={handleShow123}>
            展示123
          </Button>
          {show123 && (
            <div
              className="mt-8 rounded-lg bg-blue-50 px-12 py-6 text-3xl font-semibold text-blue-600"
              aria-live="polite"
            >
              123
            </div>
          )}
        </div>
      </div>
    </ProCard>
  );
}
