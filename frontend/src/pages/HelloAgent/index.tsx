/**
 * agent 问候页（pageId: hello_agent）
 *
 * 纯静态展示页面：在内容区域居中渲染写死的问候文案。
 * 页面不包含任何按钮、表单、链接或其他可交互控件；
 * 不发起任何后端请求，因此不呈现加载、空数据或错误状态，也不要求登录或授权。
 */

/** 问候语语义主体 */
const GREETING_PHRASE = 'hello agent';

/** 问候语句尾标点 */
const GREETING_SUFFIX = '!';

/** 页面最终渲染的完整静态问候文案 */
const GREETING_TEXT = `${GREETING_PHRASE}${GREETING_SUFFIX}`;

export default function HelloAgent() {
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
      <span style={{ fontSize: 24, fontWeight: 500 }}>{GREETING_TEXT}</span>
    </div>
  );
}
