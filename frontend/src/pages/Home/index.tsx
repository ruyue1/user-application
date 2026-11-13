import React from 'react';
import { Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

/**
 * 欢迎页：在页面内容区域展示固定字符串 "hello world"。
 * 依据 PageImplementationContract，本页无接口调用、无权限绑定、无导航绑定。
 */
const Home: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48, textAlign: 'center' }}
      >
        <Typography.Title
          level={2}
          data-information-item-id='home_hello_world_text'
          data-control-id='home_hello_world_text-display'
          style={{ marginBottom: 0 }}
        >
          hello world
        </Typography.Title>
      </ProCard>
    </div>
  );
};

export default Home;
