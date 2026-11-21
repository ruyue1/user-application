import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, Segmented, Spin, Result, Button, theme } from 'antd';
import { GlobalOutlined, SmileOutlined } from '@ant-design/icons';

type PreviewState = 'success' | 'loading' | 'error';

const GREETING_TEXT = '欢迎来到我的世界！';

const MyWorldGreeting: React.FC = () => {
const { token } = theme.useToken();
const [previewState, setPreviewState] = useState<PreviewState>('success');

  return (
    <div style={{ padding: 24 }}>
      <div
        data-preview-only="true"
        style={{
          background: token.colorFillQuaternary,
          padding: 8,
          borderRadius: 8,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          预览状态
        </Typography.Text>
        <Segmented
          data-preview-only="true"
          size="small"
          value={previewState}
          onChange={(val) => setPreviewState(val as PreviewState)}
          options={[
            { label: '正常展示', value: 'success' },
            { label: '加载中', value: 'loading' },
            { label: '加载失败', value: 'error' },
          ]}
        />
      </div>

      <ProCard
        bordered
        style={{
          maxWidth: 760,
          margin: '32px auto',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
        bodyStyle={{
          padding: '64px 32px',
          minHeight: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {previewState === 'loading' && (
          <Space direction="vertical" align="center" size={16}>
            <Spin size="large" />
            <Typography.Text type="secondary">正在加载世界欢迎语...</Typography.Text>
          </Space>
        )}

        {previewState === 'error' && (
          <Result
            status="error"
            title="世界欢迎语获取失败"
            subTitle="暂时无法读取世界欢迎语，请稍后重试。"
            extra={
              <Button
                type="primary"
                data-preview-only="true"
                onClick={() => setPreviewState('success')}
              >
                重新加载
              </Button>
            }
          />
        )}

        {previewState === 'success' && (
          <Space direction="vertical" align="center" size={24} style={{ width: '100%', textAlign: 'center' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: token.colorPrimaryBg,
                color: token.colorPrimary,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
              }}
            >
              <GlobalOutlined />
            </div>

            <Space size={8} align="center">
              <SmileOutlined style={{ color: token.colorTextSecondary }} />
              <Typography.Text type="secondary" style={{ fontSize: token.fontSize }}>
                世界欢迎语
              </Typography.Text>
            </Space>

            <Typography.Title
              level={1}
              data-information-item-id="my_world_greeting_text"
              data-control-id="my_world_greeting_text-display"
              style={{
                margin: 0,
                color: token.colorTextHeading,
                fontWeight: 600,
                letterSpacing: 1,
                wordBreak: 'break-word',
              }}
            >
              {GREETING_TEXT}
            </Typography.Title>
          </Space>
        )}
      </ProCard>
    </div>
  );
};

export default MyWorldGreeting;