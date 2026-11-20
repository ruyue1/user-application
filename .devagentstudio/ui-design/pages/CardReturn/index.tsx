import React, { useState } from 'react';
import { ProTable, ProColumns, ProCard } from '@ant-design/pro-components';
import { Button, Space, Tag, Typography, Modal, message, Row, Col, Tooltip } from 'antd';
import {
  LogoutOutlined,
  HomeOutlined,
  ScanOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

type CardItem = {
  id: string;
  name: string;
  employeeNo: string;
  cardNo: string;
  status: '使用中' | '离职';
};

const mockData: CardItem[] = [
  { id: '1', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230156', status: '使用中' },
  { id: '2', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230157', status: '使用中' },
  { id: '3', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230158', status: '使用中' },
  { id: '4', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230159', status: '使用中' },
  { id: '5', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230160', status: '使用中' },
  { id: '6', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230161', status: '使用中' },
  { id: '7', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230162', status: '使用中' },
  { id: '8', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230163', status: '使用中' },
  { id: '9', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230164', status: '使用中' },
  { id: '10', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230165', status: '使用中' },
  { id: '11', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230166', status: '使用中' },
  { id: '12', name: '张伟', employeeNo: 'EMP20240118', cardNo: 'AC-88230167', status: '使用中' },
];

const bottomIcons = [
  { id: 'scan', label: '扫码同步', icon: <ScanOutlined /> },
  { id: 'card', label: '卡片信息', icon: <IdcardOutlined /> },
  { id: 'auth', label: '权限查询', icon: <SafetyCertificateOutlined /> },
  { id: 'record', label: '办理记录', icon: <FileTextOutlined /> },
];

const CardReturn: React.FC = () => {
const [cards, setCards] = useState<CardItem[]>(mockData);
const [confirmOpen, setConfirmOpen] = useState(false);
const [completed, setCompleted] = useState(false);

const handleApply = () => {
    setCards((prev) => prev.map((c) => ({ ...c, status: '离职' })));
    setConfirmOpen(false);
    setCompleted(true);
    message.success('离职注销申请已提交，已同步至飞码');
  };

const columns: ProColumns<CardItem>[] = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '员工编号', dataIndex: 'employeeNo', key: 'employeeNo' },
    { title: '卡号', dataIndex: 'cardNo', key: 'cardNo' },
    {
      title: '权限状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) =>
        record.status === '使用中' ? (
          <Tag color="green">使用中</Tag>
        ) : (
          <Tag color="orange">离职</Tag>
        ),
    },
  ];

  if (completed) {
    return (
      <div style={{ padding: 24 }}>
        <ProCard
          bordered
          style={{ borderRadius: 12, textAlign: 'center', padding: '48px 24px' }}
        >
          <CheckCircleFilled style={{ fontSize: 64, color: '#52c41a' }} />
          <Title level={3} style={{ marginTop: 16 }}>
            注销申请已提交
          </Title>
          <Text type="secondary">
            您名下使用中的门禁卡离职注销申请已提交，数据已同步至飞码，请携带实体卡前往行政前台办理线下交卡。
          </Text>
          <div style={{ marginTop: 32 }}>
            <Button
              type="primary"
              icon={<HomeOutlined />}
              size="large"
              onClick={() => setCompleted(false)}
              data-action-id="back_home"
              data-control-id="back_home-control"
            >
              返回首页
            </Button>
          </div>
        </ProCard>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div data-information-item-id="page_title" data-control-id="page_title-display">
          <Title level={3} style={{ margin: 0 }}>
            门禁卡退还
          </Title>
        </div>

        <div data-information-item-id="sync_note" data-control-id="sync_note-display">
          <Text type="secondary">所有字段信息直接从扫码获取，并实时同步到飞码</Text>
        </div>

        <div data-information-item-id="card_list" data-control-id="card_list-display">
          <ProTable<CardItem>
            columns={columns}
            dataSource={cards}
            rowKey="id"
            search={false}
            pagination={{ pageSize: 6, showSizeChanger: false }}
            options={{ setting: false, reload: false, density: false, fullScreen: false }}
            headerTitle="使用中门禁卡列表"
          />
        </div>

        <Space size={12}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => setConfirmOpen(true)}
            data-action-id="apply_cancellation"
            data-control-id="apply_cancellation-control"
          >
            离职注销
          </Button>
          <Button
            icon={<HomeOutlined />}
            onClick={() => {}}
            data-action-id="back_home"
            data-control-id="back_home-control"
          >
            返回首页
          </Button>
        </Space>

        <div data-information-item-id="bottom_icons" data-control-id="bottom_icons-display">
          <ProCard bordered style={{ borderRadius: 12 }}>
            <Row gutter={[16, 16]} justify="space-around" align="middle">
              {bottomIcons.map((item) => (
                <Col key={item.id} xs={12} sm={6} style={{ textAlign: 'center' }}>
                  <Tooltip title={item.label}>
                    <div
                      style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        padding: '12px 0',
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{item.icon}</span>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.label}
                      </Text>
                    </div>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          </ProCard>
        </div>
      </Space>

      <Modal
        title="确认发起离职注销？"
        open={confirmOpen}
        onOk={handleApply}
        onCancel={() => setConfirmOpen(false)}
        okText="确认注销"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <Text>确认后将为您名下使用中的门禁卡发起离职注销申请，并同步至飞码。</Text>
      </Modal>
    </div>
  );
};

export default CardReturn;