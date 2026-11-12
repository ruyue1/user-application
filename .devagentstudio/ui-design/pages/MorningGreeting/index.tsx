import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space } from 'antd';
import { SmileOutlined, SunOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const MorningGreeting: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        headerBordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        title={
          <Space>
            <SunOutlined style={{ color: '#faad14' }} />
            <span>早上好展示页</span>
          </Space>
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            gap: 16,
          }}
        >
          <SmileOutlined style={{ fontSize: 56, color: '#faad14' }} />
          <Title
            level={2}
            style={{ margin: 0 }}
            data-information-item-id="morning_greeting_text"
            data-control-id="morning_greeting_text-display"
          >
            早上好
          </Title>
          <Paragraph type="secondary" style={{ margin: 0, textAlign: 'center' }}>
            本页面通过后端接口获取并展示字符串「早上好」。
          </Paragraph>
        </div>

        <div style={{ marginTop: 8 }}>
          <Text type="secondary">信息项：</Text>
          <Text
            strong
            data-information-item-id="morning_greeting_text"
            data-control-id="morning_greeting_text-display"
          >
            早上好文本
          </Text>
        </div>
      </ProCard>
    </div>
  );
};

export default MorningGreeting;