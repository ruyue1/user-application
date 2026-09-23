import { ProCard } from '@ant-design/pro-components';

/** 欢迎页展示的固定文案，纯前端静态内容，不依赖任何后端接口。 */
const WELCOME_TEXT = 'hello world';

/**
 * 欢迎页（PageKey: WelcomePage）。
 * 仅在页面主体区域渲染固定文案，不含输入、按钮等交互控件，
 * 不发起接口请求，也不渲染加载 / 错误 / 空数据状态。
 */
export default function WelcomePage() {
  return (
    <ProCard bordered={false}>
      <div className="flex items-center justify-center py-16">
        <span className="text-2xl text-gray-900">{WELCOME_TEXT}</span>
      </div>
    </ProCard>
  );
}
