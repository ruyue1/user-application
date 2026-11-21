import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, theme } from 'antd';
import { MoonOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GREETING_TEXT = '晚上好！';

const GoodEvening: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{
          minHeight: 380,
          borderRadius: token.borderRadiusLG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        bodyStyle={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: token.paddingXL,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="large" align="center">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: token.colorPrimaryBg,
              color: token.colorPrimary,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
            aria-hidden="true"
          >
            <MoonOutlined />
          </div>

          <Space direction="vertical" size={8} align="center">
            <Text type="secondary" style={{ fontSize: token.fontSize }}>
              晚间问候语
            </Text>
            <Title
              level={1}
              data-information-item-id="good_evening_greeting_text"
              data-control-id="good_evening_greeting_text-display"
              style={{
                margin: 0,
                fontSize: token.fontSizeHeading1,
                lineHeight: token.lineHeightHeading1,
                color: token.colorTextHeading,
                letterSpacing: 2,
              }}
            >
              {GREETING_TEXT}
            </Title>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export default GoodEvening;