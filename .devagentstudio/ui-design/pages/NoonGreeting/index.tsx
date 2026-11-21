import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Space, Typography, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const greetingMockData = {
  greetingText: '中午好！',
};

const NoonGreeting: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <ProCard
            bordered
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              textAlign: 'center',
              padding: `${token.paddingXL}px ${token.paddingLG}px`,
            }}
          >
            <Space direction="vertical" size={token.marginMD} style={{ width: '100%' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: token.colorPrimaryBg,
                  color: token.colorPrimary,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  margin: '0 auto',
                }}
              >
                <SmileOutlined />
              </div>

              <Text type="secondary" style={{ fontSize: token.fontSize }}>
                午间问候语
              </Text>

              <Title
                level={1}
                data-information-item-id="noon_greeting_text"
                data-control-id="noon_greeting_text-display"
                style={{
                  margin: 0,
                  color: token.colorTextHeading,
                  letterSpacing: 2,
                }}
              >
                {greetingMockData.greetingText}
              </Title>
            </Space>
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default NoonGreeting;