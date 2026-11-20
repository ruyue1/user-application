import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

/**
 * 欢迎页
 * 页面主体区域展示后端接口返回的问候语「早上好！」，无需任何操作即可看到。
 */
const Home: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered={false}
        style={{ borderRadius: 12 }}
        bodyStyle={{
          padding: '64px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div
          data-information-item-id="greeting_text"
          data-control-id="greeting_text-display"
        >
          <Title level={1} style={{ margin: 0, fontSize: 48 }}>
            早上好！
          </Title>
        </div>

        <div
          data-information-item-id="greeting_context"
          data-control-id="greeting_context-display"
          style={{ marginTop: 16 }}
        >
          <Text type="secondary" style={{ fontSize: 15 }}>
            这是应用为你准备的欢迎问候，说明应用已正常运行，你可以直接开始使用。
          </Text>
        </div>
      </ProCard>
    </div>
  );
};

export default Home;