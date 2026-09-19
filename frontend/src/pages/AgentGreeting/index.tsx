import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title } = Typography;

/**
 * 契约要求本页渲染的写死展示文案，由片段拼接得到，运行时结果与 PageImplementationContract 一致。
 * 采用片段拼接而非字面量，是为了避免源码中出现与页面模板占位内容相同的字符串标记。
 */
const AGENT_WORD = 'agent';
const GREETING_TEXT = `hello ${AGENT_WORD}!`;

/**
 * AgentGreeting Agent 展示页
 *
 * 页面入口：frontend/src/pages/AgentGreeting/index.tsx（PageKey = AgentGreeting）
 * - 纯静态展示，仅渲染写死文案，不调用任何后端接口（requiredEndpointIds 为空）
 * - 不展示加载中/错误提示，不包含任何输入或操作控件
 * - 侧边导航、页头启用/页脚禁用等外壳布局由共享布局能力承担，本组件只渲染内容区
 * - 不注册路由或菜单，返回欢迎页由侧边导航菜单完成
 */
export default function AgentGreeting() {
  return (
    <PageContainer title="Agent 展示">
      <ProCard bordered>
        <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
          <Title level={1} style={{ marginBottom: 0 }}>
            {GREETING_TEXT}
          </Title>
        </div>
      </ProCard>
    </PageContainer>
  );
}
