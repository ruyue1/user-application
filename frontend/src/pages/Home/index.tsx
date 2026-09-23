import { ProCard } from '@ant-design/pro-components';

/**
 * home 页面入口（PageImplementationContract: pageId=home）。
 *
 * 纯静态欢迎视图：在侧边导航布局的内容区居中展示写死的字符串 “hello world”。
 * 该页面不发起任何后端接口请求，不含表单 / 按钮等交互控件，也不依赖任何业务数据，
 * 渲染结果对任意访客完全一致；路由与菜单注册由平台负责。
 */
export default function Home() {
  return (
    <ProCard
      bordered={false}
      bodyStyle={{
        minHeight: 'calc(100vh - 168px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.5,
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.88)',
        }}
      >
        hello world
      </span>
    </ProCard>
  );
}
