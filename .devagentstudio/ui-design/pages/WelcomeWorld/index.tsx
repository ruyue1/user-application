import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GREETING_TEXT = '欢迎来到我的世界！';

const WelcomeWorld: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          minHeight: 360,
          borderRadius: token.borderRadiusLG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        bodyStyle={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: token.paddingXL,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="middle" align="center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: token.colorPrimaryBg,
              color: token.colorPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            <GlobalOutlined />
          </div>

          <Text type="secondary" style={{ fontSize: token.fontSize }}>
            欢迎世界问候语
          </Text>

          <Title
            level={2}
            data-information-item-id="welcome_world_greeting_text"
            data-control-id="welcome_world_greeting_text-display"
            style={{
              margin: 0,
              color: token.colorTextHeading,
              fontWeight: token.fontWeightStrong,
              letterSpacing: 1,
            }}
          >
            {GREETING_TEXT}
          </Title>
        </Space>
      </ProCard>
    </div>
  );
};

export default WelcomeWorld;