import React from 'react';
import { Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

const HelloWorld: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48, textAlign: 'center' }}
      >
        <Typography.Title
          level={2}
          data-information-item-id="hello_world_text"
          data-control-id="hello_world_text-display"
          style={{ margin: 0 }}
        >
          hello world
        </Typography.Title>
      </ProCard>
    </div>
  );
};

export default HelloWorld;