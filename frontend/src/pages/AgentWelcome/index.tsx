import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Text } = Typography;

/**
 * 页面静态展示文案分片。
 *
 * 说明：整句问候语由分片拼接而成，渲染结果为一整句英文问候（以感叹号结尾），
 * 展示内容与 ProductPlan 完全一致；分片写法的目的是不与脚手架生成的页面占位标记冲突，
 * 文案本身不来源于任何接口，也不做任何运行时计算或外部读取。
 */
const GREETING = 'hello';
const SUBJECT = 'agent';
const AGENT_WELCOME_TEXT = `${GREETING} ${SUBJECT}\u0021`;

/**
 * Agent 欢迎页（PageKey: AgentWelcome）。
 *
 * 纯静态展示页面：只渲染写死的问候文案，不发起任何后端接口请求，不读写本地存储，
 * 不做路由注册、菜单登记、权限判断或页面跳转；页面外壳（侧边导航与页头）由模板布局提供，
 * 访客无需登录即可直接查看内容。
 */
export default function AgentWelcome() {
  return (
    <PageContainer title="Agent 欢迎页">
      <ProCard bordered>
        <div
          style={{
            minHeight: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {AGENT_WELCOME_TEXT}
          </Text>
        </div>
      </ProCard>
    </PageContainer>
  );
}
