import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Row, Col, Space, Typography, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GREETING_MESSAGE = '早上好！';

const MorningGreeting: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <Row justify="center" align="middle" style={{ minHeight: 380 }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <ProCard
            bordered
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              textAlign: 'center',
              padding: token.paddingLG,
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%', padding: `${token.paddingLG}px 0` }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: '0 auto',
                  borderRadius: '50%',
                  backgroundColor: token.colorPrimaryBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SmileOutlined style={{ fontSize: 32, color: token.colorPrimary }} />
              </div>

              <Text type="secondary" style={{ fontSize: token.fontSize }}>
                早安问候语
              </Text>

              <Title
                level={1}
                data-information-item-id="morning_greeting_text"
                data-control-id="morning_greeting_text-display"
                style={{
                  margin: 0,
                  color: token.colorTextHeading,
                  letterSpacing: 2,
                }}
              >
                {GREETING_MESSAGE}
              </Title>
            </Space>
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default MorningGreeting;