import { PageContainer, ProCard } from '@ant-design/pro-components';

/** 欢迎页展示的写死文案，不来源于任何接口。 */
const WELCOME_TEXT = 'hello world';

/**
 * 欢迎页（PageKey: Home）。
 *
 * 纯静态展示页面：仅渲染写死的字符串，不发起任何网络请求，
 * 不接入数据列表、表单或权限逻辑，页面外壳（侧边导航、页头、页脚）由模板布局提供。
 */
export default function Home() {
  return (
    <PageContainer title="欢迎页">
      <ProCard bordered>
        <div
          style={{
            minHeight: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'rgba(0, 0, 0, 0.88)',
            }}
          >
            {WELCOME_TEXT}
          </span>
        </div>
      </ProCard>
    </PageContainer>
  );
}
