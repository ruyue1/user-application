import { ProCard } from '@ant-design/pro-components';
import { Divider, Space, Typography, theme } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

/**
 * 页面固定展示文案。
 *
 * 纯静态展示页，文案以常量形式集中声明，保证内容不随时间或操作变化。
 */
const PAGE_CONTENT = '欢迎来到我的世界!';

/**
 * WelcomeToMyWorld 展示页。
 *
 * 纯展示页面：在可见区域直接渲染写死的文案，无数据请求、无状态、无副作用，
 * 不承担路由注册、菜单登记与权限校验等平台职责。
 */
export default function WelcomeToMyWorld() {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }} data-page='welcome_to_my_world'>
      <ProCard bordered headerBordered style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '56px 24px' }}>
          <Space
            direction='vertical'
            size='large'
            align='center'
            style={{ width: '100%' }}
          >
            <GlobalOutlined style={{ fontSize: 72, color: token.colorPrimary }} />
            <Typography.Title
              level={2}
              data-information-item-id='welcome_to_my_world_content'
              data-control-id='welcome_to_my_world_content-display'
              style={{ margin: 0, fontWeight: 600 }}
            >
              {PAGE_CONTENT}
            </Typography.Title>
            <Divider style={{ width: 96, minWidth: 96, margin: '4px 0' }} />
            <Typography.Text type='secondary' style={{ fontSize: token.fontSizeLG }}>
              欢迎来到我的世界展示页
            </Typography.Text>
          </Space>
        </div>
      </ProCard>
    </div>
  );
}
