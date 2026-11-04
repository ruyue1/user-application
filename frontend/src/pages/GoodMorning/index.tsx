import { ProCard } from '@ant-design/pro-components';
import { Divider, Space, Typography, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

/**
 * 页面固定展示文案。
 *
 * 纯静态展示页，文案以常量形式集中声明，保证内容不随时间、用户操作或外部数据变化。
 */
const PAGE_CONTENT = '早上好!';

/**
 * GoodMorning 展示页。
 *
 * 纯展示页面：在可见区域直接渲染写死的文案，无数据请求、无状态、无副作用，
 * 不承担路由注册、菜单登记与权限校验等平台职责。
 */
export default function GoodMorning() {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }} data-page='good_morning'>
      <ProCard bordered headerBordered style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '56px 24px' }}>
          <Space
            direction='vertical'
            size='large'
            align='center'
            style={{ width: '100%' }}
          >
            <SmileOutlined style={{ fontSize: 72, color: token.colorPrimary }} />
            <Typography.Title level={2} style={{ margin: 0, fontWeight: 600 }}>
              {PAGE_CONTENT}
            </Typography.Title>
            <Divider style={{ width: 96, minWidth: 96, margin: '4px 0' }} />
            <Typography.Text type='secondary' style={{ fontSize: token.fontSizeLG }}>
              早上好展示页
            </Typography.Text>
          </Space>
        </div>
      </ProCard>
    </div>
  );
}
