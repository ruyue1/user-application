import React from 'react';
import { Typography, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const HelloWorld: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <Space size="middle" align="center">
          <SmileOutlined style={{ fontSize: 40, color: '#1677ff' }} />
          <Title
            level={1}
            data-information-item-id="hello_world-primary-text"
            data-control-id="hello_world-primary-text-display"
            style={{ margin: 0, fontSize: 48, fontWeight: 600 }}
          >
            hello world
          </Title>
        </Space>
        <Paragraph type="secondary" style={{ margin: 0, textAlign: 'center' }}>
          欢迎来到应用首页，这里是固定的展示内容。
        </Paragraph>
      </div>
    </div>
  );
};

export default HelloWorld;