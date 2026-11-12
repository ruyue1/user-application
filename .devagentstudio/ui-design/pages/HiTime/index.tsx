import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, Divider, Tag } from 'antd';
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const HiTime: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        headerBordered
        title="系统问候"
        extra={<Tag color="blue" icon={<ClockCircleOutlined />}>实时展示</Tag>}
        style={{ maxWidth: 720, margin: '0 auto' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div
            data-information-item-id="greeting_text"
            data-control-id="greeting_text-display"
          >
            <Paragraph type="secondary" style={{ marginBottom: 8 }}>
              <SmileOutlined style={{ marginRight: 6 }} />
              问候文本
            </Paragraph>
            <Title level={2} style={{ margin: 0 }}>
              你好
            </Title>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div
            data-information-item-id="system_time"
            data-control-id="system_time-display"
          >
            <Paragraph type="secondary" style={{ marginBottom: 8 }}>
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              系统时间
            </Paragraph>
            <Text strong style={{ fontSize: 18 }}>
              2026-07-15 14:32:08
            </Text>
          </div>
        </Space>
      </ProCard>
    </div>
  );
};

export default HiTime;