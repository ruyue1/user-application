import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Button, Typography, Space, theme } from 'antd';
import {
  CheckCircleFilled,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const bottomIcons = [
  { key: 'home', icon: <HomeOutlined />, label: '首页' },
  { key: 'card', icon: <IdcardOutlined />, label: '门禁卡' },
  { key: 'phone', icon: <PhoneOutlined />, label: '联系管理员' },
  { key: 'help', icon: <QuestionCircleOutlined />, label: '帮助中心' },
];

const adminList = [
  { area: '园区', name: '李媛', account: 'WS04462' },
  { area: 'OCG', name: '徐敏', account: 'IT006877' },
];

const DeactivationDone: React.FC = () => {
const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ProCard
          bordered={false}
          style={{
            width: '100%',
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadowTertiary,
          }}
          bodyStyle={{ padding: '48px 32px', textAlign: 'center' }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <div data-information-item-id="done_title" data-control-id="done_title-display">
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <CheckCircleFilled style={{ fontSize: 64, color: token.colorPrimary }} />
                <Title level={2} style={{ margin: 0 }}>
                  您已完成注销申请！
                </Title>
              </Space>
            </div>

            <div
              data-information-item-id="return_notice"
              data-control-id="return_notice-display"
              style={{ width: '100%' }}
            >
              <Paragraph style={{ margin: 0, fontSize: 15, color: token.colorTextSecondary }}>
                您的离职注销申请已提交成功，请将实体门禁卡交给对应的门禁卡管理员，以便完成线下归还。
              </Paragraph>
            </div>

            <div
              data-information-item-id="admin_info"
              data-control-id="admin_info-display"
              style={{ width: '100%' }}
            >
              <ProCard
                title="门禁卡管理员信息"
                bordered
                headerBordered
                style={{ width: '100%', textAlign: 'left' }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  {adminList.map((admin) => (
                    <div
                      key={admin.account}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: token.borderRadius,
                        background: token.colorFillQuaternary,
                      }}
                    >
                      <Space size={12}>
                        <Text strong style={{ minWidth: 48 }}>
                          {admin.area}
                        </Text>
                        <Text>{admin.name}</Text>
                      </Space>
                      <Space size={8}>
                        <IdcardOutlined style={{ color: token.colorTextTertiary }} />
                        <Text type="secondary">{admin.account}</Text>
                      </Space>
                    </div>
                  ))}
                </Space>
              </ProCard>
            </div>

            <Button
              type="primary"
              size="large"
              data-action-id="back_home"
              data-control-id="back_home-control"
              onClick={() => {}}
              style={{ minWidth: 200, height: 44 }}
            >
              返回首页
            </Button>

            <div
              data-information-item-id="bottom_icons"
              data-control-id="bottom_icons-display"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: 40,
                paddingTop: 16,
                borderTop: `1px solid ${token.colorSplit}`,
              }}
            >
              {bottomIcons.map((item) => (
                <Space
                  key={item.key}
                  direction="vertical"
                  size={4}
                  align="center"
                  style={{ color: token.colorTextTertiary }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.label}
                  </Text>
                </Space>
              ))}
            </div>
          </Space>
        </ProCard>
      </div>
    </div>
  );
};

export default DeactivationDone;