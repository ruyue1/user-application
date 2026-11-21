import { type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { ProCard } from '@ant-design/pro-components';
import { CheckCircleFilled, HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider } from 'antd';
import { fetchAccessCardClaimApplicationList } from '@/apis/contractAccessCardClaimApplicationApi';
import { fetchAccessCardList } from '@/apis/contractAccessCardApi';
import { fetchDeactivationSubmissionAccessCardList } from '@/apis/contractDeactivationSubmissionApi';

/** 页面主题色：蓝色调扁平化风格 */
const PRIMARY_COLOR = '#1677ff';
const PRIMARY_DEEP_COLOR = '#0b4fc4';

/** 返回首页的目标路由（页面 path: main → /page/main） */
const BACK_HOME_PATH = '/page/main';

/** 页面首次加载时按契约声明拉取的分页参数 */
const PAGE_LOAD_QUERY = { current: 1, pageSize: 10 } as const;

/** 管理员信息（园区 / OCG） */
const ADMIN_CONTACTS: ReadonlyArray<{ key: string; label: string; name: string; staffNo: string }> =
  [
    { key: 'park', label: '园区', name: '李媛', staffNo: 'WS04462' },
    { key: 'ocg', label: 'OCG', name: '徐敏', staffNo: 'IT006877' },
  ];

const pageStyle: CSSProperties = {
  position: 'relative',
  minHeight: '100%',
  overflow: 'hidden',
  borderRadius: 16,
  background: `linear-gradient(180deg, #eaf3ff 0%, #f6faff 46%, ${PRIMARY_COLOR} 46%, ${PRIMARY_DEEP_COLOR} 100%)`,
};

/** 底部装饰图形：高楼大厦 + 柱状图，纯 CSS 绘制（与主页面风格一致） */
function BottomDecoration() {
  return (
    <div
      aria-hidden='true'
      style={{
        position: 'relative',
        height: 168,
        marginTop: 24,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 34,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
          height: 108,
        }}
      >
        {[52, 84, 66, 108, 74, 96, 58].map((height, index) => (
          <div
            key={`tower-${index}`}
            style={{
              width: 26,
              height,
              borderRadius: '6px 6px 0 0',
              background:
                index % 2 === 0 ? 'rgba(255, 255, 255, 0.86)' : 'rgba(255, 255, 255, 0.58)',
              boxShadow: '0 4px 12px rgba(2, 40, 110, 0.18)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 92,
        }}
      >
        {[26, 44, 34, 60, 38, 50, 30].map((height, index) => (
          <div
            key={`bar-${index}`}
            style={{
              width: 14,
              height,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.42)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 注销完成页（pageId: deactivation_done）
 *
 * 离职注销申请提交成功后的确认提示页：
 * - 居中展示标题「您已完成注销申请！」
 * - 提示员工将实体门禁卡交还门禁卡管理员
 * - 展示园区（李媛 / WS04462）与 OCG（徐敏 / IT006877）管理员信息
 * - 底部蓝色「返回首页」按钮，跳转至 main 页面
 *
 * 页面加载时按 PageImplementationContract 声明的接口预取数据，
 * 接口失败静默容错，不影响结果页展示与返回首页操作。
 */
export default function DeactivationDone() {
  const navigate = useNavigate();

  useRequest(() => fetchAccessCardClaimApplicationList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });
  useRequest(() => fetchAccessCardList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });
  useRequest(() => fetchDeactivationSubmissionAccessCardList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });

  /** 导航动作 back_home：返回主页面 */
  const handleBackHome = () => {
    navigate(BACK_HOME_PATH);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <div style={pageStyle}>
        <ProCard
          ghost
          style={{ background: 'transparent' }}
          bodyStyle={{ padding: '48px 24px 0' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleFilled style={{ fontSize: 64, color: PRIMARY_COLOR }} />

            <h1
              style={{
                margin: '20px 0 0',
                fontSize: 24,
                lineHeight: 1.5,
                fontWeight: 700,
                color: '#0f2540',
                letterSpacing: 1,
                textAlign: 'center',
              }}
            >
              您已完成注销申请！
            </h1>

            <p
              style={{
                margin: '12px 0 0',
                maxWidth: 320,
                fontSize: 14,
                lineHeight: 1.7,
                color: '#5b7292',
                textAlign: 'center',
              }}
            >
              请将您的实体门禁卡交给门禁卡管理员，由管理员完成后续注销流程。
            </p>
          </div>
        </ProCard>

        <div style={{ position: 'relative', padding: '24px 24px 0' }}>
          <ProCard
            title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f2540' }}>
                <SafetyCertificateOutlined style={{ color: PRIMARY_COLOR }} />
                门禁卡管理员
              </span>
            }
            bordered
            style={{ borderRadius: 12 }}
          >
            {ADMIN_CONTACTS.map((contact, index) => (
              <div key={contact.key}>
                {index > 0 ? <Divider style={{ margin: '12px 0' }} /> : null}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 14, color: '#5b7292' }}>{contact.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0f2540' }}>
                    {contact.name}
                    <span style={{ color: '#5b7292', fontWeight: 400 }}> / </span>
                    {contact.staffNo}
                  </span>
                </div>
              </div>
            ))}
          </ProCard>

          <div style={{ marginTop: 24 }}>
            <Button
              block
              type='primary'
              icon={<HomeOutlined />}
              data-action-id='back_home-control'
              style={{
                height: 48,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 2,
                boxShadow: '0 8px 20px rgba(22, 119, 255, 0.24)',
              }}
              onClick={handleBackHome}
            >
              返回首页
            </Button>
          </div>

          <BottomDecoration />
        </div>
      </div>
    </ConfigProvider>
  );
}
