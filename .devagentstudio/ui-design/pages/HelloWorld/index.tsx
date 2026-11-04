import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Skeleton, Result, Button, Space, Segmented } from 'antd';
import { ReloadOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type PreviewState = 'success' | 'loading' | 'error';

const HelloWorld: React.FC = () => {
const [state, setState] = useState<PreviewState>('success');

const renderContent = () => {
    if (state === 'loading') {
      return (
        <div style={{ padding: 24 }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      );
    }

    if (state === 'error') {
      return (
        <Result
          status="error"
          title="页面加载失败"
          subTitle="无法加载 Hello World 欢迎信息，请稍后重试。"
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              data-preview-only="true"
              onClick={() => setState('success')}
            >
              重试
            </Button>
          }
        />
      );
    }

    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 24 }} />
        <Title
          level={2}
          data-information-item-id="hello_world_text"
          data-control-id="hello_world_text-display"
          style={{ marginBottom: 12 }}
        >
          hello world
        </Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          欢迎信息已成功加载
        </Paragraph>
      </div>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Segmented
            data-preview-only="true"
            value={state}
            onChange={(value) => setState(value as PreviewState)}
            options={[
              { label: <Space size={4}><CheckCircleOutlined />成功</Space>, value: 'success' },
              { label: <Space size={4}><LoadingOutlined />加载</Space>, value: 'loading' },
              { label: <Space size={4}><CloseCircleOutlined />错误</Space>, value: 'error' },
            ]}
          />
        </div>
        <ProCard
          title="Hello World 展示"
          headerBordered
          bordered
        >
          {renderContent()}
        </ProCard>
      </Space>
    </div>
  );
};

export default HelloWorld;