import React from 'react';
import { Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Greeting: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 24,
        }}
      >
        <SmileOutlined style={{ fontSize: 64, opacity: 0.85 }} />
        <Typography.Title
          level={1}
          data-information-item-id="greeting_text"
          data-control-id="greeting_text-display"
          style={{ margin: 0, fontWeight: 600 }}
        >
          欢迎!
        </Typography.Title>
      </div>
    </div>
  );
};

export default Greeting;