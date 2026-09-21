import { ProCard } from '@ant-design/pro-components';

/**
 * page_home —— Hello World 展示页
 *
 * 纯静态展示页面：居中呈现固定字符串 "hello world"。
 * 不发起任何数据请求，不包含表单、按钮、链接等交互元素，
 * 页头/侧边导航/页脚等外壳布局由 layout 统一负责。
 */
export default function PageHome() {
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
        hello world
      </span>
    </ProCard>
  );
}
