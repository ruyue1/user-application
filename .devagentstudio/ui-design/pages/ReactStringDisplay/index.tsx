import React from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Result, Typography, Space, Tag, Alert } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ReactStringDisplay: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <ProCard
        title="React前端编程展示"
        bordered
        headerBordered
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => {}}
            data-action-id="load_string"
            data-control-id="load_string-control"
            data-ui-effect="重新加载并展示后端接口返回的字符串"
          >
            加载字符串
          </Button>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message="页面仅用于演示前后端字符串数据的获取与展示，不提供人员明细数据的新增、删除或修改入口。"
          />

          <ProDescriptions
            column={1}
            bordered
            data-information-item-id="react_string_content"
            data-control-id="react_string_content-display"
            columns={[
              {
                title: '接口返回的字符串',
                dataIndex: 'content',
                key: 'content',
                render: () => (
                  <Title level={3} style={{ margin: 0 }}>
                    React前端编程！
                  </Title>
                ),
              },
            ]}
            dataSource={{ content: 'React前端编程！' }}
          />

          <div>
            <Paragraph type="secondary" style={{ marginBottom: 8 }}>
              字符串原文：
            </Paragraph>
            <Tag color="processing" style={{ fontSize: 16, padding: '4px 12px' }}>
              <Text strong>React前端编程！</Text>
            </Tag>
          </div>
        </Space>
      </ProCard>
    </div>
  );
};

export default ReactStringDisplay;