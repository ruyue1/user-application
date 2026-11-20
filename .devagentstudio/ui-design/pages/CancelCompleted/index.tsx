import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Space, Divider, theme } from 'antd';
import {
  CheckCircleFilled,
  HomeOutlined,
  IdcardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

type AdminItem = {
  area: string;
  name: string;
  account: string;
};

const admins: AdminItem[] = [
  { area: '园区', name: '李媛', account: 'WS04462' },
  { area: 'OCG', name: '徐敏', account: 'IT006877' },
];

const bottomIcons = [
  { key: 'card', label: '门禁卡', icon: <IdcardOutlined /> },
  { key: 'apply', label: '我的申请', icon: <FileTextOutlined /> },
  { key: 'app', label: '应用中心', icon: <AppstoreOutlined /> },
  { key: 'help', label: '帮助中心', icon: <QuestionCircleOutlined /> },
];

const CancelCompleted: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <ProCard
          bordered={false}
          style={{
            borderRadius: token.borderRadiusLG,
            background: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
            textAlign: 'center',
          }}
          bodyStyle={{ padding: '48px 40px 40px' }}
        >
          {/* 结果标题 */}
          <div data-information-item-id="result_title" data-control-id="result_title-display">
            <CheckCircleFilled style={{ fontSize: 64, color: token.colorPrimary }} />
            <Title level={3} style={{ marginTop: 24, marginBottom: 0 }}>
              您已完成注销申请！
            </Title>
          </div>

          {/* 交卡提示 */}
          <div
            data-information-item-id="result_note"
            data-control-id="result_note-display"
            style={{ marginTop: 16 }}
          >
            <Text type="secondary" style={{ fontSize: 16 }}>
              请把实体卡交给门禁卡管理员
            </Text>
          </div>

          {/* 门禁卡管理员信息 */}
          <div
            data-information-item-id="admin_info"
            data-control-id="admin_info-display"
            style={{ marginTop: 32 }}
          >
            <div
              style={{
                display: 'inline-block',
                minWidth: 420,
                maxWidth: '100%',
                textAlign: 'left',
                background: token.colorFillQuaternary,
                borderRadius: token.borderRadiusLG,
                padding: '20px 24px',
              }}
            >
              <Text strong style={{ display: 'block', marginBottom: 12 }}>
                门禁卡管理员
              </Text>
              {admins.map((item, index) => (
                <div
                  key={item.area}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom:
                      index === admins.length - 1
                        ? 'none'
                        : `1px solid ${token.colorBorderSecondary}`,
                  }}
                >
                  <Space size={12}>
                    <Text
                      type="secondary"
                      style={{ minWidth: 48, display: 'inline-block' }}
                    >
                      {item.area}
                    </Text>
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">{item.account}</Text>
                  </Space>
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ margin: '32px 0 24px' }} />

          {/* 返回首页 */}
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => {}}
            data-action-id="back_home"
            data-control-id="back_home-control"
            style={{ minWidth: 200, height: 44, fontSize: 16 }}
          >
            返回首页
          </Button>
        </ProCard>

        {/* 底部功能图标 */}
        <div
          data-information-item-id="bottom_icons"
          data-control-id="bottom_icons-display"
          style={{
            marginTop: 32,
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
          }}
        >
          {bottomIcons.map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                color: token.colorTextSecondary,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: token.borderRadiusLG,
                  background: token.colorPrimaryBg,
                  color: token.colorPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                {item.icon}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.label}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CancelCompleted;