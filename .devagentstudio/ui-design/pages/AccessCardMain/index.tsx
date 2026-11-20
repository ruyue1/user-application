import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Space, Tag, theme } from 'antd';
import {
  ScanOutlined,
  RollbackOutlined,
  SendOutlined,
  InboxOutlined,
  LockOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ENTRIES = [
  { key: 'claim', label: '门禁卡领用', icon: <ScanOutlined />, actionId: 'go_claim', disabled: false },
  { key: 'return', label: '门禁卡归还', icon: <RollbackOutlined />, actionId: 'go_return', disabled: false },
  {
    key: 'trip-borrow',
    label: '出差卡借用',
    icon: <SendOutlined />,
    actionId: 'tap_trip_borrow',
    disabled: true,
    hint: '暂不提供',
    uiEffect: '按钮呈禁用样式并提示暂不提供，不进入任何业务页面',
  },
  {
    key: 'trip-return',
    label: '出差卡归还',
    icon: <InboxOutlined />,
    actionId: 'tap_trip_return',
    disabled: true,
    hint: '暂不提供',
    uiEffect: '按钮呈禁用样式并提示暂不提供，不进入任何业务页面',
  },
] as const;

const AccessCardMain: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          borderRadius: token.borderRadiusLG,
          overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(180deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 55%)`,
          minHeight: 640,
        }}
        bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', minHeight: 640 }}
      >
        {/* 系统标题 */}
        <div style={{ padding: '48px 24px 32px', textAlign: 'center' }}>
          <BankOutlined style={{ fontSize: 36, color: token.colorPrimary, marginBottom: 12 }} />
          <Title
            level={2}
            data-information-item-id="app_title"
            data-control-id="app_title-display"
            style={{ margin: 0, color: token.colorPrimary, fontWeight: 600, letterSpacing: 1 }}
          >
            成都中心门禁卡管理系统
          </Title>
        </div>

        {/* 功能入口按钮 */}
        <div style={{ flex: 1, padding: '0 24px' }}>
          <div
            data-information-item-id="function_entries"
            data-control-id="function_entries-display"
            style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <Button
              block
              type="primary"
              size="large"
              icon={<ScanOutlined />}
              style={{ height: 56, fontSize: 16, borderRadius: token.borderRadiusLG, justifyContent: 'flex-start', paddingInlineStart: 20, boxShadow: `0 4px 12px ${token.colorPrimaryBg}` }}
              data-action-id="go_claim"
              data-control-id="go_claim-control"
            >
              门禁卡领用
            </Button>

            <Button
              block
              type="primary"
              size="large"
              icon={<RollbackOutlined />}
              style={{ height: 56, fontSize: 16, borderRadius: token.borderRadiusLG, justifyContent: 'flex-start', paddingInlineStart: 20, boxShadow: `0 4px 12px ${token.colorPrimaryBg}` }}
              data-action-id="go_return"
              data-control-id="go_return-control"
            >
              门禁卡归还
            </Button>

            <Button
              block
              size="large"
              disabled
              icon={<SendOutlined />}
              style={{ height: 56, fontSize: 16, borderRadius: token.borderRadiusLG, justifyContent: 'flex-start', paddingInlineStart: 20 }}
              data-action-id="tap_trip_borrow"
              data-control-id="tap_trip_borrow-control"
              data-ui-effect="按钮呈禁用样式并提示暂不提供，不进入任何业务页面"
            >
              出差卡借用
            </Button>

            <Button
              block
              size="large"
              disabled
              icon={<InboxOutlined />}
              style={{ height: 56, fontSize: 16, borderRadius: token.borderRadiusLG, justifyContent: 'flex-start', paddingInlineStart: 20 }}
              data-action-id="tap_trip_return"
              data-control-id="tap_trip_return-control"
              data-ui-effect="按钮呈禁用样式并提示暂不提供，不进入任何业务页面"
            >
              出差卡归还
            </Button>

            <div
              data-information-item-id="placeholder_entries"
              data-control-id="placeholder_entries-display"
              style={{ marginTop: 4, paddingInlineStart: 4 }}
            >
              <Space size={6}>
                <LockOutlined style={{ fontSize: 12, color: token.colorTextTertiary }} />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  出差卡借用、出差卡归还暂不提供
                </Text>
                <Tag color="default" style={{ fontSize: 11, lineHeight: '16px', marginInlineEnd: 0 }}>
                  占位
                </Tag>
              </Space>
            </div>
          </div>
        </div>

        {/* 底部装饰图形 */}
        <div
          data-information-item-id="decoration"
          data-control-id="decoration-display"
          aria-label="底部装饰图形"
          style={{ position: 'relative', height: 168, marginTop: 32, overflow: 'hidden', pointerEvents: 'none' }}
        >
          <div style={{ position: 'absolute', left: 24, bottom: 0, display: 'flex', alignItems: 'flex-end', gap: 8, opacity: 0.35 }}>
            {[46, 78, 34, 96, 60, 112, 72].map((h, i) => (
              <div key={i} style={{ width: 12, height: h, borderRadius: '4px 4px 0 0', background: token.colorPrimary }} />
            ))}
          </div>

          <div style={{ position: 'absolute', right: 24, bottom: 0, display: 'flex', alignItems: 'flex-end', gap: 6, opacity: 0.28 }}>
            {[
              { w: 34, h: 84 },
              { w: 44, h: 128 },
              { w: 30, h: 64 },
              { w: 52, h: 148 },
              { w: 36, h: 96 },
            ].map((b, i) => (
              <div
                key={i}
                style={{ width: b.w, height: b.h, borderRadius: '3px 3px 0 0', background: token.colorPrimary, position: 'relative' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: '10px 6px 0',
                    backgroundImage: `repeating-linear-gradient(180deg, ${token.colorBgContainer} 0px, ${token.colorBgContainer} 6px, transparent 6px, transparent 14px)`,
                    opacity: 0.6,
                    borderRadius: 2,
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: token.colorPrimary, opacity: 0.25 }} />
        </div>
      </ProCard>
    </div>
  );
};

export default AccessCardMain;