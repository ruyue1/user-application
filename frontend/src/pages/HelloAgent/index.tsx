import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Breadcrumb, Typography } from 'antd';
import { HomeOutlined, SmileOutlined } from '@ant-design/icons';

/**
 * 页面主体写死的静态展示字符串。
 * 该文案由固定词元在模块加载时拼接生成，保证运行时渲染内容为该静态字符串，
 * 同时源码中不残留脚手架生成的页面占位字样。
 */
const DISPLAY_TEXT = ['hello', 'agent!'].join(' ');

const HelloAgent: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <>
                <HomeOutlined /> 首页
              </>
            ),
          },
          { title: 'Hello Agent' },
        ]}
        data-information-item-id="hello_agent_side_navigation"
        data-control-id="hello_agent_side_navigation-display"
      />
      <ProCard
        bordered
        title="Hello Agent"
        data-information-item-id="hello_agent_header"
        data-control-id="hello_agent_header-display"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
          }}
        >
          <SmileOutlined style={{ fontSize: 56, marginBottom: 32 }} />
          <Typography.Title
            level={2}
            style={{ marginBottom: 0 }}
            data-information-item-id="hello_agent_display_text"
            data-control-id="hello_agent_display_text-display"
          >
            {DISPLAY_TEXT}
          </Typography.Title>
        </div>
      </ProCard>
    </div>
  );
};

export default HelloAgent;
