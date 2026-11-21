import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const NoonGreeting: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          maxWidth: 680,
          margin: '48px auto',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
        bodyStyle={{
          padding: '64px 32px',
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="middle" align="center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: token.colorWarningBg,
              border: `1px solid ${token.colorWarningBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SmileOutlined style={{ fontSize: 32, color: token.colorWarning }} />
          </div>

          <Text type="secondary" style={{ fontSize: token.fontSize }}>
            午间问候语
          </Text>

          <Title
            level={1}
            data-information-item-id="noon_greeting_text"
            data-control-id="noon_greeting_text-display"
            style={{
              margin: 0,
              fontSize: 44,
              fontWeight: token.fontWeightStrong,
              color: token.colorTextHeading,
              letterSpacing: 2,
            }}
          >
            中午好！
          </Title>
        </Space>
      </ProCard>
    </div>
  );
};

export default NoonGreeting;