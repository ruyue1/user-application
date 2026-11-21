import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Home: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          minHeight: 420,
          borderRadius: token.borderRadiusLG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: token.paddingXL * 2,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size={token.marginMD} align="center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: token.colorPrimaryBg,
              color: token.colorPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            <SmileOutlined />
          </div>
          <Text type="secondary" style={{ fontSize: token.fontSize }}>
            欢迎页
          </Text>
          <Title
            level={1}
            data-information-item-id="morning_greeting_text"
            data-control-id="morning_greeting_text-display"
            style={{
              margin: 0,
              fontSize: token.fontSizeHeading1,
              fontWeight: token.fontWeightStrong,
              color: token.colorTextHeading,
              letterSpacing: 1,
            }}
          >
            早上好！
          </Title>
        </Space>
      </ProCard>
    </div>
  );
};

export default Home;