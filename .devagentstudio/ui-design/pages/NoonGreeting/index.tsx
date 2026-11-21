import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { SunOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const NoonGreeting: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: token.borderRadiusLG,
          backgroundColor: token.colorBgContainer,
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: token.paddingXL,
        }}
      >
        <Space direction="vertical" size="large" align="center">
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: token.colorWarningBg,
              color: token.colorWarning,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            <SunOutlined />
          </div>

          <Space direction="vertical" size="small" align="center">
            <Text type="secondary" style={{ fontSize: token.fontSize }}>
              午间问候语
            </Text>
            <Title
              level={1}
              data-information-item-id="noon_greeting_text"
              data-control-id="noon_greeting_text-display"
              style={{
                margin: 0,
                color: token.colorTextHeading,
                letterSpacing: 2,
              }}
            >
              中午好！
            </Title>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export default NoonGreeting;