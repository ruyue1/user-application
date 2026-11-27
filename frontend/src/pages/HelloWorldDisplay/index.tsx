import { Typography } from 'antd';

const { Text } = Typography;

/**
 * 文案展示页：纯静态内容区，固定展示 "你好"，
 * 无输入、按钮、表单或数据请求，布局（侧边导航、页头、无页脚）由主 Layout 提供。
 */
const HelloWorldDisplay = () => {
  return <Text>你好</Text>;
};

export default HelloWorldDisplay;
