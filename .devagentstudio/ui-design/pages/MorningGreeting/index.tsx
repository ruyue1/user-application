import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type GreetingMockItem = {
  greetingText: string;
};

const mockData: GreetingMockItem[] = [
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
  { greetingText: '早上好！' },
];

const MorningGreeting: React.FC = () => {
const { token } = theme.useToken();
const currentGreeting = mockData[0];

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          maxWidth: 720,
          margin: '48px auto',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
        bodyStyle={{
          padding: '64px 32px',
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size={24} align="center" style={{ width: '100%' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: token.colorPrimaryBg,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: token.colorPrimary,
              fontSize: 36,
            }}
          >
            <SmileOutlined />
          </div>

          <Space direction="vertical" size={8} align="center">
            <Text type="secondary" style={{ fontSize: token.fontSize }}>
              早安问候语
            </Text>
            <Title
              level={1}
              data-information-item-id="morning_greeting_text"
              data-control-id="morning_greeting_text-display"
              style={{
                margin: 0,
                color: token.colorTextHeading,
                letterSpacing: 2,
              }}
            >
              {currentGreeting.greetingText}
            </Title>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export default MorningGreeting;