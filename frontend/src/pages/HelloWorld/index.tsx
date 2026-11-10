import type { FC } from 'react';
import { Typography } from 'antd';
import { ProCard } from '@ant-design/pro-components';

/**
 * HelloWorld 展示页
 *
 * 纯展示页面：加载后直接呈现固定文本 'hello world'，
 * 不调用任何业务接口，也不涉及权限、跳转与状态绑定。
 */
const HelloWorld: FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        bordered
        style={{ maxWidth: 720, margin: '0 auto' }}
        bodyStyle={{ padding: 48, textAlign: 'center' }}
      >
        <Typography.Title
          level={2}
          data-information-item-id='hello_world_text'
          data-control-id='hello_world_text-display'
          style={{ margin: 0 }}
        >
          hello world
        </Typography.Title>
      </ProCard>
    </div>
  );
};

export default HelloWorld;
