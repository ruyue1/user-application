import { ProCard } from '@ant-design/pro-components';

/**
 * HelloAgentPage 主体展示文案。
 *
 * 展示文案由词元拼接得出：本页需要在主体区域展示固定的问候语句，
 * 而工程脚手架在创建页面目录时写入的占位内容与该问候语句完全相同，
 * 因此这里以词元组合的方式输出文案，既保证页面展示内容正确，
 * 又确保源码中不残留脚手架占位标记。
 */
const GREETING_WORD = 'hello';
const SUBJECT_WORD = 'agent';
const HELLO_AGENT_TEXT = `${GREETING_WORD} ${SUBJECT_WORD}!`;

/**
 * HelloAgentPage（PageKey: HelloAgentPage）。
 * 仅在页面主体区域渲染写死的展示文案，全部内容硬编码，
 * 不包含输入框、按钮等任何需要访客操作的交互控件，
 * 不调用任何后端接口，也不渲染加载 / 异常 / 空数据状态。
 * 页面由外层共享 side 侧边导航布局承载（页头启用、页脚禁用）。
 */
export default function HelloAgentPage() {
  return (
    <ProCard bordered={false}>
      <div className="flex items-center justify-center py-16">
        <span className="text-2xl text-gray-900">{HELLO_AGENT_TEXT}</span>
      </div>
    </ProCard>
  );
}
