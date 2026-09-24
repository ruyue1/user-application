import React, { useState, useEffect } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Spin, Empty, Result, Space, Segmented } from 'antd';
import { ReloadOutlined, SunOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type PageState = 'loading' | 'success' | 'empty' | 'error';

const MorningGreeting: React.FC = () => {
const [state, setState] = useState<PageState>('loading');

  useEffect(() => {
const timer = setTimeout(() => {
      setState('success');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" />
            <Paragraph type="secondary" style={{ marginTop: 24, marginBottom: 0 }}>
              正在获取早上好文案...
            </Paragraph>
          </div>
        );
      case 'success':
        return (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <SunOutlined style={{ fontSize: 56, color: '#faad14', marginBottom: 32 }} />
            <Title
              level={1}
              style={{ marginBottom: 0 }}
              data-information-item-id="morning_greeting_text"
              data-control-id="morning_greeting_text-display"
            >
              早上好!
            </Title>
          </div>
        );
      case 'empty':
        return (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Empty description="暂无早上好文案" />
          </div>
        );
      case 'error':
        return (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Result
              status="error"
              title="获取失败"
              subTitle="无法获取早上好文案，请稍后重试"
              extra={
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  data-preview-only="true"
                  onClick={() => {
                    setState('loading');
                    setTimeout(() => setState('success'), 1500);
                  }}
                >
                  重新加载
                </Button>
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <ProCard bordered style={{ minHeight: 420 }}>
        {renderContent()}
      </ProCard>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Space align="center">
          <Text type="secondary" style={{ fontSize: 12 }} data-preview-only="true">
            预览状态切换
          </Text>
          <Segmented
            data-preview-only="true"
            value={state}
            onChange={(val) => setState(val as PageState)}
            options={[
              { label: '加载中', value: 'loading' },
              { label: '成功', value: 'success' },
              { label: '空内容', value: 'empty' },
              { label: '错误', value: 'error' },
            ]}
          />
        </Space>
      </div>
    </div>
  );
};

export default MorningGreeting;