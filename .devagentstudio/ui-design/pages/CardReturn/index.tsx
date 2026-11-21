import React, { useState } from 'react';
import { ProTable, ProColumns, ProCard } from '@ant-design/pro-components';
import { Button, Modal, Result, Space, Tag, Typography, theme, message } from 'antd';
import {
  IdcardOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  SmileOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type CardItem = {
  id: string;
  name: string;
  employeeNo: string;
  cardNo: string;
  status: 'in_use';
};

const mockCards: CardItem[] = [
  { id: '1', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8820-1193', status: 'in_use' },
  { id: '2', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8820-2204', status: 'in_use' },
  { id: '3', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8821-3388', status: 'in_use' },
  { id: '4', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8821-4415', status: 'in_use' },
  { id: '5', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8822-5527', status: 'in_use' },
  { id: '6', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8822-6639', status: 'in_use' },
  { id: '7', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8823-7741', status: 'in_use' },
  { id: '8', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8823-8853', status: 'in_use' },
  { id: '9', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8824-9965', status: 'in_use' },
  { id: '10', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8824-1077', status: 'in_use' },
  { id: '11', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8825-1189', status: 'in_use' },
  { id: '12', name: '张伟', employeeNo: 'EMP20190371', cardNo: 'AC-8825-2291', status: 'in_use' },
];

const bottomIcons = [
  { icon: <IdcardOutlined />, label: '门禁卡' },
  { icon: <ClockCircleOutlined />, label: '考勤' },
  { icon: <SwapOutlined />, label: '访客通行' },
  { icon: <PhoneOutlined />, label: '后勤服务' },
];

const CardReturn: React.FC = () => {
const { token } = theme.useToken();
const [confirmOpen, setConfirmOpen] = useState(false);
const [done, setDone] = useState(false);

const handleConfirm = () => {
    setConfirmOpen(false);
    setDone(true);
  };

const columns: ProColumns<CardItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '员工编号',
      dataIndex: 'employeeNo',
      key: 'employeeNo',
      width: 160,
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
      width: 200,
      render: (_, record) => (
        <Space size={6}>
          <IdcardOutlined style={{ color: token.colorPrimary }} />
          <Text style={{ fontFamily: 'monospace' }}>{record.cardNo}</Text>
        </Space>
      ),
    },
    {
      title: '权限状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: () => (
        <Tag color="processing" icon={<SafetyCertificateOutlined />}>
          使用中
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* 页面标题 */}
      <div
        data-information-item-id="page_title"
        data-control-id="page_title-display"
        style={{ marginBottom: 16 }}
      >
        <Title level={3} style={{ margin: 0 }}>
          门禁卡退还
        </Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0' }}>
          查看本人名下使用中的门禁卡，并在线发起离职注销申请
        </Paragraph>
      </div>

      {/* 说明文案 */}
      <div
        data-information-item-id="return_notice"
        data-control-id="return_notice-display"
        style={{
          marginBottom: 16,
          padding: '12px 16px',
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px solid ${token.colorBorderSecondary}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <SmileOutlined style={{ color: token.colorPrimary, marginTop: 3 }} />
        <Text type="secondary">
          以下所有字段信息直接从扫码获取，并实时同步到飞码。注销申请提交后由飞码发起注销流程，请在线下将实体门禁卡交由门禁卡管理员。
        </Text>
      </div>

      {done ? (
        /* 已完成界面（goto_done 步骤呈现） */
        <ProCard
          style={{ marginTop: 8 }}
          styles={{ body: { padding: '40px 24px' } }}
        >
          <Result
            status="success"
            icon={<SmileOutlined style={{ color: token.colorSuccess }} />}
            title="门禁卡归还申请已提交"
            subTitle="申请注销字段已更新为「离职」并同步至飞码，飞码已发起注销流程。请将实体门禁卡交予门禁卡管理员完成线下归还。"
            extra={
              <Button
                type="primary"
                icon={<HomeOutlined />}
                data-action-id="back_home"
                data-control-id="back_home-control"
                onClick={() => {
                  setDone(false);
                  message.success('已返回首页');
                }}
              >
                返回首页
              </Button>
            }
          />
        </ProCard>
      ) : (
        <ProCard
          variant="outlined"
          styles={{ body: { padding: 0 } }}
        >
          {/* 门禁卡信息表格 */}
          <div
            data-information-item-id="card_info_table"
            data-control-id="card_info_table-display"
          >
            <ProTable<CardItem>
              headerTitle="本人名下使用中的门禁卡"
              columns={columns}
              dataSource={mockCards}
              rowKey="id"
              search={false}
              pagination={{ pageSize: 5, showSizeChanger: false, showTotal: (t) => `共 ${t} 张` }}
              options={false}
              toolBarRender={() => [
                <Button
                  key="apply"
                  type="primary"
                  danger
                  icon={<ArrowLeftOutlined />}
                  data-action-id="apply_deactivation"
                  data-control-id="apply_deactivation-control"
                  data-ui-effect="弹出离职注销确认对话框"
                  onClick={() => setConfirmOpen(true)}
                >
                  离职注销
                </Button>,
              ]}
            />
          </div>
        </ProCard>
      )}

      {/* 底部图标区 */}
      <div
        data-information-item-id="bottom_icons"
        data-control-id="bottom_icons-display"
        style={{
          marginTop: 24,
          padding: '16px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: 16,
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
        }}
      >
        {bottomIcons.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              color: token.colorTextSecondary,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: token.colorBgContainer,
                border: `1px solid ${token.colorBorderSecondary}`,
                fontSize: 20,
                color: token.colorPrimary,
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

      {/* 离职注销确认对话框 */}
      <Modal
        open={confirmOpen}
        title="确认发起离职注销"
        okText="确认注销"
        cancelText="取消"
        okButtonProps={{ danger: true, 'data-action-step-id': 'submit_deactivation' } as any}
        onOk={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      >
        <Paragraph>
          确认对本人名下选中的使用中门禁卡发起离职注销申请？提交后申请注销字段将更新为
          <Text strong>「离职」</Text>并同步至飞码，由飞码发起注销流程。
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          注销流程发起后不可撤销，请确保已完成线下实体卡归还安排。
        </Paragraph>
      </Modal>
    </div>
  );
};

export default CardReturn;