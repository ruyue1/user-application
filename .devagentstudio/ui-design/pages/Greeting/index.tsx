import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Space } from 'antd';
import { SmileOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Greeting: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48 }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <SmileOutlined style={{ fontSize: 64, color: '#faad14' }} />

          <div data-information-item-id="greeting_message_text" data-control-id="greeting_message_text-display">
            <Title level={2} style={{ marginBottom: 8 }}>欢迎来到我的世界！</Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              问候语内容
            </Paragraph>
          </div>

          <div>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              size="large"
              data-action-id="greeting_navigate_to_home"
              data-control-id="greeting_navigate_to_home-control"
              onClick={() => {}}
            >
              前往欢迎页
            </Button>
          </div>
        </Space>
      </ProCard>
    </div>
  );
};

export default Greeting;