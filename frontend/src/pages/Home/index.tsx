import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent(new Date());
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const { dateText, timeText, weekdayText } = formatClock(current);

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
      </div>
    </ProCard>
  );
}
