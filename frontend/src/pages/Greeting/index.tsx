import type { FC } from 'react';
import { Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

/**
 * 欢迎展示页（Greeting）
 *
 * 纯展示页面：加载后直接呈现固定文本 '欢迎!'，
 * 不调用任何业务接口，也不涉及权限、跳转与状态绑定。
 * 侧边导航切换由平台布局与路由提供，页面内部不包含交互控件。
 */
const Greeting: FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48, textAlign: 'center' }}
      >
        <Typography.Title
          level={2}
          data-information-item-id='greeting_text'
          data-control-id='greeting_text-display'
          style={{ margin: 0 }}
        >
          欢迎!
        </Typography.Title>
      </ProCard>
    </div>
  );
};

export default Greeting;
