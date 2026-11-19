import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Space, Result, theme } from 'antd';
import { ReloadOutlined, ClockCircleOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

type FetchState = 'success' | 'error';

const SystemTimeView: React.FC = () => {
const { token } = theme.useToken();
const [fetchState, setFetchState] = useState<FetchState>('success');
const [currentTime, setCurrentTime] = useState<string>('2026-07-15 14:32:08');

const handleRefresh = () => {
    // 本地模拟：刷新后更新为最新时间，保持成功状态
const now = new Date();
const pad = (n: number) => String(n).padStart(2, '0');
const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
      now.getHours(),
    )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setCurrentTime(formatted);
    setFetchState('success');
  };

const handleRetry = () => {
    setFetchState('success');
    setCurrentTime('2026-07-15 14:32:08');
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: '100%',
        background: token.colorPrimaryBg,
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <ProCard
          bordered
          style={{ borderRadius: token.borderRadiusLG, boxShadow: token.boxShadowTertiary }}
          bodyStyle={{ padding: 40 }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%', textAlign: 'center' }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <ClockCircleOutlined style={{ fontSize: 40, color: token.colorPrimary }} />
              <Title level={3} style={{ margin: 0 }}>
                后端系统当前时间
              </Title>
            </Space>

            {fetchState === 'success' ? (
              <div
                data-information-item-id="current_time_display"
                data-control-id="current_time_display-display"
                style={{
                  padding: '24px 16px',
                  background: token.colorFillQuaternary,
                  borderRadius: token.borderRadiusLG,
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 600,
                    letterSpacing: 2,
                    color: token.colorTextHeading,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {currentTime}
                </Text>
                <div style={{ marginTop: 12 }}>
                  <Space size={6}>
                    <CheckCircleFilled style={{ color: token.colorSuccess }} />
                    <Text type="secondary">时间获取成功，精确到秒</Text>
                  </Space>
                </div>
              </div>
            ) : (
              <div
                data-information-item-id="time_fetch_status"
                data-control-id="time_fetch_status-display"
                style={{
                  padding: '16px 8px',
                  background: token.colorErrorBg,
                  borderRadius: token.borderRadiusLG,
                }}
              >
                <Result
                  status="error"
                  icon={<CloseCircleFilled style={{ color: token.colorError }} />}
                  title="时间获取失败"
                  subTitle="未能获取后端系统当前时间，请稍后重试。"
                  extra={
                    <Button
                      type="primary"
                      icon={<ReloadOutlined />}
                      data-preview-only="true"
                      onClick={handleRetry}
                    >
                      重试
                    </Button>
                  }
                />
              </div>
            )}

            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              data-action-id="refresh_time"
              data-control-id="refresh_time-control"
              data-ui-effect="重新获取并更新展示后端系统当前时间"
              onClick={handleRefresh}
            >
              刷新时间
            </Button>
          </Space>
        </ProCard>
      </div>
    </div>
  );
};

export default SystemTimeView;