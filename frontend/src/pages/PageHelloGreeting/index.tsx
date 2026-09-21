import { ProCard } from '@ant-design/pro-components';

/**
 * page_hello_greeting —— 你好 展示页（PageKey: PageHelloGreeting）
 *
 * 纯静态展示页面：居中呈现写死的固定字符串「你好!」。
 * 不发起任何数据请求（不 import src/apis/**，不使用 useRequest），
 * 不包含表单、输入框、按钮、链接等交互入口，无任何副作用逻辑。
 * 页头、side 导航与页面外壳由 layout 统一负责，本页只渲染内容区文案。
 */
export function PageHelloGreeting() {
  return (
    <ProCard
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <span
        style={{
          fontSize: 24,
          lineHeight: 1.6,
          color: 'rgba(0, 0, 0, 0.88)',
        }}
      >
        你好!
      </span>
    </ProCard>
  );
}

export default PageHelloGreeting;
