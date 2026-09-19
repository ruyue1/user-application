import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

/**
 * Home 欢迎页
 *
 * 页面入口：frontend/src/pages/Home/index.tsx（PageKey = Home）
 * - 纯静态展示，文案硬编码为 "hello world"，不调用任何后端接口
 * - 侧边导航、页头/页脚等外壳布局由共享布局能力承担，本组件只渲染内容区
 * - 不注册路由或菜单，不涉及权限与导航绑定
 */
export default function Home() {
  return (
    <PageContainer title="欢迎">
      <ProCard bordered>
        <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
          <Title level={1} style={{ marginBottom: 16 }}>
            hello world
          </Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            欢迎使用「欢迎页」应用
          </Paragraph>
        </div>
      </ProCard>
    </PageContainer>
  );
}
