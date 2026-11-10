import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space } from 'antd';
import { SunOutlined } from '@ant-design/icons';

const { Title } = Typography;

const NoonGreeting: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          textAlign: 'center',
          minHeight: 440,
          borderRadius: 12,
        }}
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 440,
        }}
        data-information-item-id="noon_greeting_text"
        data-control-id="noon_greeting_text-display"
      >
        <Space direction="vertical" size="large" align="center">
          <SunOutlined style={{ fontSize: 84, color: '#faad14' }} />
          <Title
            level={1}
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            中午好!
          </Title>
        </Space>
      </ProCard>
    </div>
  );
};

export default NoonGreeting;