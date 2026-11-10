import React from 'react';
import { Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MorningGreeting: React.FC = () => {
  return (
    <div style={{ padding: 24, minHeight: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 120px)',
          gap: 24,
        }}
      >
        <SmileOutlined style={{ fontSize: 72, color: 'var(--ant-color-primary, #1677ff)' }} />
        <Title
          level={1}
          data-information-item-id="morning_greeting_text"
          data-control-id="morning_greeting_text-display"
          style={{ margin: 0, fontWeight: 600 }}
        >
          早上好!
        </Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          祝您今天工作顺利
        </Text>
      </div>
    </div>
  );
};

export default MorningGreeting;