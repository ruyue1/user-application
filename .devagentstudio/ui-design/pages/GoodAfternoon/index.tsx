import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Space, Typography, theme } from 'antd';
import { SunOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GoodAfternoon: React.FC = () => {
const { token } = theme.useToken();
const greetingText = '中午好！';

  return (
    <div style={{ padding: 24 }}>
      <Row justify="center" align="middle" style={{ minHeight: 400 }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <ProCard
            bordered
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              textAlign: 'center',
            }}
            bodyStyle={{
              padding: token.paddingXL * 1.5,
            }}
          >
            <Space direction="vertical" size={token.marginMD} align="center">
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: token.colorWarningBg,
                  border: `1px solid ${token.colorWarningBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SunOutlined
                  style={{
                    fontSize: 32,
                    color: token.colorWarning,
                  }}
                />
              </div>

              <Text type="secondary" style={{ fontSize: token.fontSize }}>
                午间问候语
              </Text>

              <Title
                level={1}
                data-information-item-id="good_afternoon_greeting_text"
                data-control-id="good_afternoon_greeting_text-display"
                style={{
                  margin: 0,
                  color: token.colorTextHeading,
                  fontWeight: token.fontWeightStrong,
                  letterSpacing: 2,
                }}
              >
                {greetingText}
              </Title>
            </Space>
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default GoodAfternoon;