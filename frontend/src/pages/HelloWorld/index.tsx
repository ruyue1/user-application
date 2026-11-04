import { ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * HelloWorld 展示页。
 *
 * 纯展示页面：直接渲染写死的 "hello world" 字符串，
 * 无交互、无状态管理、不发起任何网络请求。
 */
export default function HelloWorld() {
  return (
    <div style={{ padding: 24 }} data-page="hello_world">
      <ProCard title="Hello World 展示" headerBordered bordered>
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
          <CheckCircleOutlined
            style={{ fontSize: 48, color: '#52c41a', marginBottom: 24 }}
          />
          <Title level={2} style={{ marginBottom: 12 }}>
            hello world
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            欢迎信息已成功加载
          </Paragraph>
        </div>
      </ProCard>
    </div>
  );
}
