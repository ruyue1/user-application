import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Spin, Result, Empty, Button, Segmented, Space, Divider } from 'antd';
import { ReloadOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type PreviewState = 'success' | 'loading' | 'empty' | 'error' | 'validation';

const Home: React.FC = () => {
const [state, setState] = useState<PreviewState>('success');

const renderContent = () => {
    if (state === 'loading') {
      return (
        <div style={{ minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" tip="页面加载中…" fullscreen={false} />
        </div>
      );
    }

    if (state === 'error') {
      return (
        <Result
          status="error"
          title="页面加载失败"
          subTitle="欢迎页暂时无法加载，请稍后重试或刷新页面。"
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              data-preview-only="true"
              onClick={() => setState('success')}
            >
              重新加载
            </Button>
          }
        />
      );
    }

    if (state === 'empty') {
      return (
        <Empty
          style={{ padding: '64px 0' }}
          description="本页内容为写死的静态字符串，不存在内容为空的状态。"
        >
          <Button
            type="primary"
            data-preview-only="true"
            onClick={() => setState('success')}
          >
            查看欢迎内容
          </Button>
        </Empty>
      );
    }

    if (state === 'validation') {
      return (
        <Result
          status="info"
          title="无校验状态"
          subTitle="欢迎页不涉及用户输入或提交行为，因此不触发任何校验状态。"
          extra={
            <Button
              type="primary"
              data-preview-only="true"
              onClick={() => setState('success')}
            >
              返回欢迎页
            </Button>
          }
        />
      );
    }

    return (
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
          hello world
        </Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          欢迎进入应用首页，主体区域展示写死的静态字符串“hello world”。
        </Paragraph>
      </div>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Segmented
            value={state}
            onChange={(val) => setState(val as PreviewState)}
            options={[
              { label: '成功', value: 'success' },
              { label: '加载', value: 'loading' },
              { label: '空状态', value: 'empty' },
              { label: '错误', value: 'error' },
              { label: '校验', value: 'validation' },
            ]}
            data-preview-only="true"
          />
        </div>

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
            {renderContent()}
          </div>
        </ProCard>
      </Space>
    </div>
  );
};

export default Home;