import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, Divider, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

/**
 * 页面固定展示文案（写死内容，无动态数据）。
 *
 * 文案按词片段拼接生成，便于集中维护；页面不发起任何后端请求，
 * 也不包含路由跳转、权限判断或状态管理逻辑。
 */
const GREETING_PREFIX = 'hello';
const GREETING_SUBJECT = 'agent';
const GREETING_TEXT = `${GREETING_PREFIX} ${GREETING_SUBJECT}!`;

/**
 * Hello Agent 展示页（/page/hello-agent）。
 *
 * 纯静态展示页面：渲染写死的问候文案，无接口调用、无交互、无权限控制。
 */
const HelloAgent: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }} data-page="hello_agent">
      <ProCard
        bordered
        headerBordered
        style={{ maxWidth: 720, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', padding: '56px 24px' }}>
          <Space
            direction="vertical"
            size="large"
            align="center"
            style={{ width: '100%' }}
          >
            <SmileOutlined style={{ fontSize: 72, color: token.colorPrimary }} />
            <Typography.Title
              level={2}
              data-information-item-id="hello_agent_content"
              data-control-id="hello_agent_content-display"
              style={{ margin: 0, fontWeight: 600 }}
            >
              {GREETING_TEXT}
            </Typography.Title>
            <Divider style={{ width: 96, minWidth: 96, margin: '4px 0' }} />
            <Typography.Text type="secondary" style={{ fontSize: token.fontSizeLG }}>
              Hello Agent 展示页
            </Typography.Text>
          </Space>
        </div>
      </ProCard>
    </div>
  );
};

export default HelloAgent;
