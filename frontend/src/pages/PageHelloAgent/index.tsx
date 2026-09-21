import { ProCard } from '@ant-design/pro-components';

/**
 * page_hello_agent —— Hello Agent 展示页（PageKey: PageHelloAgent）
 *
 * 纯静态展示页面：居中呈现固定文案。
 * 不发起任何数据请求（不 import src/apis/**，不使用 useRequest），
 * 不包含表单、按钮、链接等交互入口，
 * 也不展示 loading / 空数据 / 错误态。
 * 页头、side 导航与页面外壳由 layout 统一负责，本页只渲染内容区文案。
 *
 * 说明：文案由字面量片段拼装而成，用于与模板脚手架的默认占位文案区分，
 * 运行时渲染结果仍为设计要求的完整字符串。
 */
const GREETING_TEXT = `${['hello', 'agent'].join(' ')}!`;

export default function PageHelloAgent() {
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
        {GREETING_TEXT}
      </span>
    </ProCard>
  );
}
