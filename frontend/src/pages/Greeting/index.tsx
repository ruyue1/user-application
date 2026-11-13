import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Alert, Button, Space, Spin, Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { getGreeting } from '@/apis/greetingApi';
import { PAGE_ROUTE } from '@/constants/routes';
import { pageRouteSegmentFromPath } from '@/utils/pageIdentity';

const { Title, Paragraph } = Typography;

/**
 * 问候页：进入页面时调用 greeting.getGreeting（GET /api/hi）获取问候语内容并展示。
 * 依据 PageImplementationContract，本页仅使用该接口，并提供「前往欢迎页」导航动作。
 */
const Greeting: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useRequest(() => getGreeting());

  const content = typeof data?.content === 'string' ? data.content.trim() : '';
  const showError = !loading && !content;

  const homePath = useMemo(() => `/${PAGE_ROUTE}/${pageRouteSegmentFromPath('home')}`, []);

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48 }}
      >
        <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center' }}>
          <SmileOutlined style={{ fontSize: 64, color: '#faad14' }} />

          <div
            data-information-item-id='greeting_message_text'
            data-control-id='greeting_message_text-display'
            aria-busy={loading}
          >
            {loading ? (
              <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                <Spin />
                <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                  问候语加载中...
                </Paragraph>
              </Space>
            ) : showError ? (
              <Alert
                type='error'
                showIcon
                message='问候语加载失败'
                description={error?.message || '未能获取到问候语内容，请重试。'}
                action={
                  <Button size='small' onClick={refresh}>
                    重试
                  </Button>
                }
              />
            ) : (
              <>
                <Title level={2} style={{ marginBottom: 8 }}>
                  {content}
                </Title>
                <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                  问候语内容
                </Paragraph>
              </>
            )}
          </div>

          <div>
            <Button
              type='primary'
              icon={<HomeOutlined />}
              size='large'
              data-action-id='greeting_navigate_to_home'
              data-control-id='greeting_navigate_to_home-control'
              onClick={() => navigate(homePath)}
            >
              前往欢迎页
            </Button>
          </div>
        </Space>
      </ProCard>
    </div>
  );
};

export default Greeting;
