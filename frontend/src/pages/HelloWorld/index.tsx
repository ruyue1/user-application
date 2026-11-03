import { ProCard } from '@ant-design/pro-components';

/** 页面唯一业务内容：写死的展示文本 */
const HELLO_WORLD_TEXT = 'hello world';

/**
 * Hello World 页
 *
 * 纯静态展示页面：
 * - 仅渲染固定字符串 'hello world'，不依赖接口、状态、时间、用户或环境；
 * - 无加载态、错误态、空状态提示；
 * - 不含按钮、链接、表单等任何可点击 / 可提交 / 可导航元素，不发起任何网络请求。
 */
export default function HelloWorld() {
  return (
    <ProCard bordered={false}>
      <div className='flex min-h-[480px] items-center justify-center'>
        <span className='text-2xl font-semibold text-gray-800'>{HELLO_WORLD_TEXT}</span>
      </div>
    </ProCard>
  );
}
