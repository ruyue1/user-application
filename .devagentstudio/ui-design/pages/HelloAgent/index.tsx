import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, Divider, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const HelloAgent: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        headerBordered
        style={{ maxWidth: 720, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', padding: '56px 24px' }}>
          <Space
            direction="vertical"
            size="large"
            align="center"
            style={{ width: '100%' }}
          >
            <SmileOutlined style={{ fontSize: 72, color: token.colorPrimary }} />
            <Typography.Title
              level={2}
              data-information-item-id="hello_agent_content"
              data-control-id="hello_agent_content-display"
              style={{ margin: 0, fontWeight: 600 }}
            >
              hello agent!
            </Typography.Title>
            <Divider style={{ width: 96, minWidth: 96, margin: '4px 0' }} />
            <Typography.Text
              type="secondary"
              style={{ fontSize: token.fontSizeLG }}
            >
              Hello Agent 展示页
            </Typography.Text>
          </Space>
        </div>
      </ProCard>
    </div>
  );
};

export default HelloAgent;