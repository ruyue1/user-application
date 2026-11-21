import React, { useState } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Alert, Button, Popconfirm, Space, Tag, Typography, message } from 'antd';
import { ArrowLeftOutlined, LogoutOutlined } from '@ant-design/icons';

type CardStatus = '使用中';
type DeactivationStatus = '未申请' | '离职';

interface ActiveCardItem {
  id: string;
  employeeName: string;
  employeeNo: string;
  cardNo: string;
  permissionStatus: CardStatus;
  deactivationStatus: DeactivationStatus;
}

const initialMockData: ActiveCardItem[] = [
  { id: '1', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001234', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '2', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001235', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '3', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001299', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '4', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001312', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '5', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001345', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '6', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001388', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '7', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001401', permissionStatus: '使用中', deactivationStatus: '未申请' },
  { id: '8', employeeName: '张伟', employeeNo: 'EMP20240108', cardNo: 'AC88001426', permissionStatus: '使用中', deactivationStatus: '未申请' },
];

const CardReturn: React.FC = () => {
const [cardList, setCardList] = useState<ActiveCardItem[]>(initialMockData);

const handleApplyDeactivation = (record: ActiveCardItem) => {
    setCardList((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? { ...item, deactivationStatus: '离职' }
          : item
      )
    );
    message.success(`门禁卡 ${record.cardNo} 申请注销已更新为「离职」并同步至飞码端`);
  };

const columns: ProColumns<ActiveCardItem>[] = [
    {
      title: '姓名',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: '员工编号',
      dataIndex: 'employeeNo',
      key: 'employeeNo',
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },
    {
      title: '权限状态',
      dataIndex: 'permissionStatus',
      key: 'permissionStatus',
      render: (_, record) => (
        <Tag color="green">{record.permissionStatus}</Tag>
      ),
    },
    {
      title: '申请注销',
      dataIndex: 'deactivationStatus',
      key: 'deactivationStatus',
      render: (_, record) =>
        record.deactivationStatus === '离职' ? (
          <Tag color="orange">离职</Tag>
        ) : (
          <Tag color="default">未申请</Tag>
        ),
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Popconfirm
          title="确认发起离职注销？"
          description={`确认对卡号 ${record.cardNo} 发起离职注销并同步至飞码端吗？`}
          okText="确认"
          cancelText="取消"
          onConfirm={() => handleApplyDeactivation(record)}
          disabled={record.deactivationStatus === '离职'}
        >
          <Button
            type="primary"
            danger
            size="small"
            icon={<LogoutOutlined />}
            disabled={record.deactivationStatus === '离职'}
            data-action-id="apply_deactivation"
            data-control-id="apply_deactivation-control"
          >
            {record.deactivationStatus === '离职' ? '已申请离职' : '离职注销'}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            门禁卡退还
          </Typography.Title>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {}}
            data-action-id="back_home"
            data-control-id="back_home-control"
          >
            返回首页
          </Button>
        </div>

        <Alert
          type="info"
          showIcon
          message="所有字段信息直接从扫码获取，并实时同步到飞码。"
          data-information-item-id="return_notice"
          data-control-id="return_notice-display"
        />

        <ProTable<ActiveCardItem>
          columns={columns}
          dataSource={cardList}
          rowKey="id"
          search={false}
          options={false}
          pagination={{ pageSize: 5, showSizeChanger: false }}
          headerTitle="使用中门禁卡信息列表"
          data-information-item-id="active_card_list"
          data-control-id="active_card_list-display"
        />
      </Space>
    </div>
  );
};

export default CardReturn;