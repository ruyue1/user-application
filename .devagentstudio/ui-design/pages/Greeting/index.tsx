import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Space, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const greetingText = '晚上好！';

const Greeting: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <ProCard
          data-information-item-id="greeting_text"
          data-control-id="greeting_text-display"
          data-action-id="load_greeting"
          data-control-id-role="display"
          bordered
          style={{ textAlign: 'center', padding: '48px 24px' }}
        >
          <Title level={1} style={{ margin: 0 }}>
            {greetingText}
          </Title>
        </ProCard>

        <ProCard bordered>
          <Alert
            data-information-item-id="greeting_read_only_notice"
            data-control-id="greeting_read_only_notice-display"
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            message="只读展示说明"
            description={
              <Text type="secondary">
                本页面仅用于展示问候接口返回的问候语，不提供新增、删除、修改等任何数据处理操作入口。
              </Text>
            }
          />
        </ProCard>
      </Space>
    </div>
  );
};

export default Greeting;