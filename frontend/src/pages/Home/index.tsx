/**
 * 欢迎页（pageId: home）
 *
 * 纯静态展示页面：在内容区域居中渲染写死的字符串 “hello world”。
 * 不包含任何按钮、表单、链接或其他可交互控件；
 * 不发起任何后端请求，因此不呈现加载、空数据或错误状态。
 */
const WELCOME_TEXT = 'hello world';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // 抵消 ProLayout 头部与内容区留白，使文案在可视区域内垂直居中
        minHeight: 'calc(100vh - 112px)',
      }}
    >
      <span style={{ fontSize: 24, fontWeight: 500 }}>{WELCOME_TEXT}</span>
    </div>
  );
}
