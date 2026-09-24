import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Divider, Space, Typography } from 'antd';
import { CheckCircleOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const WELCOME_TEXT = 'hello world';

const Home: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <ProCard
          bordered
          headerBordered
          title={
            <Space>
              <HomeOutlined />
              <span>欢迎页</span>
            </Space>
          }
          extra={
            <Text type="secondary" style={{ fontSize: 13 }}>
              侧边导航 · 页头启用 · 页脚禁用
            </Text>
          }
          style={{ maxWidth: 960, margin: '0 auto' }}
          bodyStyle={{ padding: 24 }}
        >
          <div
            data-information-item-id="home_page_context"
            data-control-id="home_page_context-display"
          >
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
              当前处于「欢迎页」，页面采用侧边导航布局并展示页头，页脚不展示。访客无需登录即可查看本页内容。
            </Paragraph>
            <Divider style={{ margin: '12px 0' }} />
            <div
              style={{
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
              <Title
                level={2}
                style={{ margin: 0 }}
                data-information-item-id="home_welcome_text"
                data-control-id="home_welcome_text-display"
              >
                {WELCOME_TEXT}
              </Title>
              <Paragraph type="secondary" style={{ margin: 0 }}>
                欢迎进入应用首页，主体区域展示写死的静态字符串“hello world”。
              </Paragraph>
            </div>
          </div>
        </ProCard>
      </Space>
    </div>
  );
};

export default Home;
