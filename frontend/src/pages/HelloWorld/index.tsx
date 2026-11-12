import { ProCard } from '@ant-design/pro-components';

/**
 * Hello World 展示页
 *
 * 纯静态展示页面：主内容区固定展示字符串 hello world，
 * 不调用任何后端接口，不包含按钮、链接、表单与权限判断。
 */
export default function HelloWorld() {
  return (
    <ProCard bordered>
      <div className='flex items-center justify-center py-16'>
        <p className='text-2xl font-semibold text-gray-800'>hello world</p>
      </div>
    </ProCard>
  );
}
