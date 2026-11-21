import { type CSSProperties, type ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { ProCard } from '@ant-design/pro-components';
import {
  AuditOutlined,
  CarryOutOutlined,
  LoginOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { fetchAccessCardClaimApplicationList } from '@/apis/contractAccessCardClaimApplicationApi';
import { fetchAccessCardList } from '@/apis/contractAccessCardApi';
import { fetchDeactivationSubmissionAccessCardList } from '@/apis/contractDeactivationSubmissionApi';

/** 页面主题色：蓝色调扁平化风格 */
const PRIMARY_COLOR = '#1677ff';
const PRIMARY_DEEP_COLOR = '#0b4fc4';

/** 出差卡功能占位提示 */
const PLACEHOLDER_DISABLED_REASON = '出差卡借用与出差卡归还功能暂未开放';

/** 页面首次加载时拉取的分页参数 */
const PAGE_LOAD_QUERY = { current: 1, pageSize: 10 } as const;

/** 已确认页面 pageId → 平台托管的页面路由 */
const PAGE_PATHS: Record<string, string> = {
  card_claim: '/page/card-claim',
  card_return: '/page/card-return',
};

const ENTRIES: ReadonlyArray<{
  key: string;
  label: string;
  icon: ReactNode;
  actionId: 'goto_claim' | 'goto_return';
  targetPageId: 'card_claim' | 'card_return';
  description: string;
}> = [
  {
    key: 'claim',
    label: '门禁卡领用',
    icon: <LoginOutlined />,
    actionId: 'goto_claim',
    targetPageId: 'card_claim',
    description: '查看本人待领签的申请明细并完成领签',
  },
  {
    key: 'return',
    label: '门禁卡归还',
    icon: <LogoutOutlined />,
    actionId: 'goto_return',
    targetPageId: 'card_return',
    description: '提交本人使用中门禁卡的离职注销申请',
  },
];

const PLACEHOLDER_ENTRIES: ReadonlyArray<{ key: string; label: string; icon: ReactNode }> = [
  { key: 'business-borrow', label: '出差卡借用', icon: <CarryOutOutlined /> },
  { key: 'business-return', label: '出差卡归还', icon: <AuditOutlined /> },
];

const pageStyle: CSSProperties = {
  position: 'relative',
  minHeight: '100%',
  overflow: 'hidden',
  borderRadius: 16,
  background: `linear-gradient(180deg, #eaf3ff 0%, #f6faff 46%, ${PRIMARY_COLOR} 46%, ${PRIMARY_DEEP_COLOR} 100%)`,
};

const buttonStyle: CSSProperties = {
  height: 84,
  borderRadius: 12,
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  boxShadow: '0 8px 20px rgba(22, 119, 255, 0.24)',
};

/** 底部装饰图形：高楼大厦 + 柱状图，纯 CSS 绘制 */
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
              background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.86)' : 'rgba(255, 255, 255, 0.58)',
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
 * 主页面：成都中心门禁卡管理系统首页
 * 提供门禁卡领用、门禁卡归还导航入口，以及出差卡借还禁用占位入口。
 */
export default function Main() {
  const navigate = useNavigate();

  // 页面加载时按契约声明接口预取数据；接口失败静默容错，不影响功能入口展示与跳转。
  useRequest(() => fetchAccessCardClaimApplicationList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });
  useRequest(() => fetchAccessCardList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });
  useRequest(() => fetchDeactivationSubmissionAccessCardList({ ...PAGE_LOAD_QUERY }), {
    onError: () => undefined,
  });

  /** 导航动作：跳转到契约声明的目标页面 */
  const goToPage = useCallback(
    (targetPageId: string) => {
      navigate(PAGE_PATHS[targetPageId] ?? '/page');
    },
    [navigate],
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <div style={pageStyle}>
        <ProCard
          ghost
          style={{ background: 'transparent' }}
          bodyStyle={{ padding: '40px 24px 0' }}
        >
          <div style={{ textAlign: 'center' }}>
            <SafetyCertificateOutlined
              style={{ fontSize: 48, color: PRIMARY_COLOR, marginBottom: 16 }}
            />
            <h1
              style={{
                margin: 0,
                fontSize: 24,
                lineHeight: 1.5,
                fontWeight: 700,
                color: '#0f2540',
                letterSpacing: 1,
              }}
            >
              成都中心门禁卡管理系统
            </h1>
            <p style={{ margin: '8px 0 0', color: '#5b7292', fontSize: 13 }}>
              请选择需要办理的业务
            </p>
          </div>
        </ProCard>

        <div style={{ position: 'relative', padding: '28px 24px 0' }}>
          <ProCard ghost style={{ background: 'transparent' }} bodyStyle={{ padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {ENTRIES.map((entry) => (
                <div key={entry.key}>
                  <Button
                    type='primary'
                    block
                    style={buttonStyle}
                    data-action-id={entry.actionId}
                    onClick={() => goToPage(entry.targetPageId)}
                  >
                    {entry.icon}
                    {entry.label}
                  </Button>
                  <div
                    style={{
                      marginTop: 8,
                      textAlign: 'center',
                      fontSize: 12,
                      color: '#5b7292',
                    }}
                  >
                    {entry.description}
                  </div>
                </div>
              ))}

              {PLACEHOLDER_ENTRIES.map((entry) => (
                <div key={entry.key} title={PLACEHOLDER_DISABLED_REASON}>
                  <Button
                    block
                    disabled
                    style={{
                      ...buttonStyle,
                      background: 'rgba(255, 255, 255, 0.78)',
                      borderColor: 'rgba(22, 119, 255, 0.28)',
                      color: 'rgba(15, 37, 64, 0.4)',
                      boxShadow: 'none',
                    }}
                    aria-disabled
                  >
                    {entry.icon}
                    {entry.label}
                  </Button>
                  <div
                    style={{
                      marginTop: 8,
                      textAlign: 'center',
                      fontSize: 12,
                      color: 'rgba(255, 255, 255, 0.72)',
                    }}
                  >
                    {PLACEHOLDER_DISABLED_REASON}
                  </div>
                </div>
              ))}
            </div>
          </ProCard>

          <BottomDecoration />
        </div>
      </div>
    </ConfigProvider>
  );
}
