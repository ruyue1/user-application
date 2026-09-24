import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Breadcrumb } from 'antd';
import { HomeOutlined, SmileOutlined } from '@ant-design/icons';

const HelloAgent: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <><HomeOutlined /> 首页</> },
          { title: 'Hello Agent' },
        ]}
        data-information-item-id="hello_agent_side_navigation"
        data-control-id="hello_agent_side_navigation-display"
      />
      <ProCard
        bordered
        title="Hello Agent"
        data-information-item-id="hello_agent_header"
        data-control-id="hello_agent_header-display"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
          }}
        >
          <SmileOutlined style={{ fontSize: 56, marginBottom: 32 }} />
          <Typography.Title
            level={2}
            style={{ marginBottom: 0 }}
            data-information-item-id="hello_agent_display_text"
            data-control-id="hello_agent_display_text-display"
          >
            hello agent!
          </Typography.Title>
        </div>
      </ProCard>
    </div>
  );
};

export default HelloAgent;