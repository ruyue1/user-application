import { Typography } from 'antd';

const { Text } = Typography;

/**
 * Hello World 展示页：纯静态内容区，固定展示 "hello world"，
 * 无输入、按钮、表单或数据请求，布局（侧边导航、页头、无页脚）由主 Layout 提供。
 */
const HelloWorldDisplay = () => {
  return <Text>hello world</Text>;
};

export default HelloWorldDisplay;
