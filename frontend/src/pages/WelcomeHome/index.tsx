import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title } = Typography;

/**
 * 欢迎页（PageKey: WelcomeHome）
 *
 * 纯展示型页面：页面主体直接渲染写死的字符串 hello world。
 * 不包含表单、列表、查询条件，也没有任何需要用户提交的交互，
 * 不调用任何后端接口，不涉及权限控制与路由跳转。
 */
export default function WelcomeHome() {
  return (
    <PageContainer title="欢迎页">
      <ProCard headerBordered>
        <div
          style={{
            minHeight: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            hello world
          </Title>
        </div>
      </ProCard>
    </PageContainer>
  );
}
