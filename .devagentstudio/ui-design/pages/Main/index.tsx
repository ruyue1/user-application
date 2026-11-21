import React from 'react';
import { Typography, Button, Space, Grid, theme } from 'antd';
import { IdcardOutlined, RollbackOutlined, CarOutlined, UndoOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

type FunctionButton = {
  actionId?: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const functionButtons: FunctionButton[] = [
  {
    actionId: 'goto_claim',
    label: '门禁卡领用',
    icon: <IdcardOutlined />,
  },
  {
    actionId: 'goto_return',
    label: '门禁卡归还',
    icon: <RollbackOutlined />,
  },
  {
    label: '出差卡借用',
    icon: <CarOutlined />,
    disabled: true,
  },
  {
    label: '出差卡归还',
    icon: <UndoOutlined />,
    disabled: true,
  },
];

const Main: React.FC = () => {
const { token } = useToken();
const screens = useBreakpoint();
const isCompact = !screens.md;

const buttonHeight = isCompact ? 64 : 72;
const decorationHeight = isCompact ? 120 : 160;

  return (
    <div
      style={{
        padding: 24,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${token.colorBgContainer} 0%, ${token.colorBgLayout} 100%)`,
      }}
    >
      {/* 页面标题 */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: isCompact ? 16 : 40,
          paddingBottom: isCompact ? 24 : 48,
        }}
      >
        <Title
          level={isCompact ? 3 : 2}
          data-information-item-id="page_title"
          data-control-id="page_title-display"
          style={{
            margin: 0,
            color: token.colorPrimary,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          成都中心门禁卡管理系统
        </Title>
      </div>

      {/* 功能按钮组 */}
      <div
        data-information-item-id="function_buttons"
        data-control-id="function_buttons-display"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 520,
          margin: '0 auto',
        }}
      >
        <Space direction="vertical" size={isCompact ? 16 : 20} style={{ width: '100%' }}>
          {functionButtons.map((btn) => {
const interactive = !btn.disabled && !!btn.actionId;
            return (
              <Button
                key={btn.label}
                block
                size="large"
                disabled={btn.disabled}
                icon={btn.icon}
                data-action-id={btn.actionId}
                data-control-id={btn.actionId ? `${btn.actionId}-control` : undefined}
                style={{
                  height: buttonHeight,
                  fontSize: isCompact ? 18 : 20,
                  fontWeight: 500,
                  borderRadius: token.borderRadiusLG,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingInline: 24,
                  textAlign: 'left',
                  background: interactive ? token.colorPrimary : undefined,
                  color: interactive ? token.colorWhite : undefined,
                  borderColor: interactive ? token.colorPrimary : undefined,
                  boxShadow: interactive ? token.boxShadowSecondary : 'none',
                }}
                type={interactive ? 'primary' : 'default'}
                onClick={() => {}}
              >
                {btn.label}
              </Button>
            );
          })}
        </Space>
      </div>

      {/* 底部装饰图形 */}
      <div
        data-information-item-id="bottom_decoration"
        data-control-id="bottom_decoration-display"
        style={{
          marginTop: isCompact ? 32 : 48,
          height: decorationHeight,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isCompact ? 6 : 10,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {[
          { h: 0.4, w: 22 },
          { h: 0.62, w: 30 },
          { h: 0.5, w: 24 },
          { h: 0.78, w: 34 },
          { h: 0.55, w: 26 },
          { h: 0.9, w: 38 },
          { h: 0.68, w: 28 },
          { h: 1, w: 42 },
          { h: 0.72, w: 30 },
          { h: 0.58, w: 26 },
          { h: 0.85, w: 36 },
          { h: 0.48, w: 24 },
          { h: 0.66, w: 30 },
          { h: 0.42, w: 22 },
        ].map((bar, idx) => (
          <div
            key={idx}
            style={{
              height: decorationHeight * bar.h,
              width: bar.w,
              borderRadius: 4,
              background: token.colorPrimary,
              opacity: 0.08 + idx * 0.03 > 0.3 ? 0.3 : 0.08 + idx * 0.03,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;