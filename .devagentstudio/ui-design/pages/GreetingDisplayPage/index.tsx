import React, { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Spin } from 'antd';

const { Title } = Typography;

const GreetingDisplayPage: React.FC = () => {
const [greeting, setGreeting] = useState<string>('');
const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setGreeting('晚上好！');
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}
        bodyStyle={{ padding: '48px 24px' }}
      >
        <div
          data-action-id="load_greeting"
          data-control-id="load_greeting-control"
        >
          {loading ? (
            <Spin />
          ) : (
            <Title
              level={1}
              style={{ margin: 0, fontSize: 40 }}
              data-information-item-id="greeting_text"
              data-control-id="greeting_text-display"
            >
              {greeting}
            </Title>
          )}
        </div>
      </ProCard>
    </div>
  );
};

export default GreetingDisplayPage;