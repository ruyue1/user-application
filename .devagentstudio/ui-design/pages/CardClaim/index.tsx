import React, { useMemo, useState } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Card, Space, Tag, Typography, Checkbox, message } from 'antd';
import {
  CheckCircleOutlined,
  HomeOutlined,
  ScanOutlined,
  SyncOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

type ClaimStatus = 'pending' | 'claimed';

type ClaimItem = {
  id: string;
  name: string;
  employeeNo: string;
  cardNo: string;
  status: ClaimStatus;
};

const mockData: ClaimItem[] = [
  { id: '1', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0001', status: 'pending' },
  { id: '2', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0002', status: 'pending' },
  { id: '3', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0003', status: 'pending' },
  { id: '4', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0004', status: 'pending' },
  { id: '5', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0005', status: 'pending' },
  { id: '6', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0006', status: 'pending' },
  { id: '7', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0007', status: 'pending' },
  { id: '8', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0008', status: 'pending' },
  { id: '9', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0009', status: 'pending' },
  { id: '10', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0010', status: 'pending' },
  { id: '11', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0011', status: 'pending' },
  { id: '12', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8821-0012', status: 'pending' },
];

const STATUS_MAP: Record<ClaimStatus, { text: string; color: string }> = {
  pending: { text: '待领签', color: 'orange' },
  claimed: { text: '已领签', color: 'green' },
};

const bottomIcons = [
  { key: 'scan', label: '扫码', icon: <ScanOutlined /> },
  { key: 'card', label: '门禁卡', icon: <IdcardOutlined /> },
  { key: 'sync', label: '同步飞码', icon: <SyncOutlined /> },
  { key: 'safety', label: '安全中心', icon: <SafetyCertificateOutlined /> },
];

const CardClaim: React.FC = () => {
const [records, setRecords] = useState<ClaimItem[]>(mockData);
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

const pendingRecords = useMemo(
    () => records.filter((item) => item.status === 'pending'),
    [records],
  );

const allPendingSelected =
    pendingRecords.length > 0 && selectedRowKeys.length === pendingRecords.length;

const handleToggleRow = (id: string, checked: boolean) => {
    setSelectedRowKeys((prev) =>
      checked ? Array.from(new Set([...prev, id])) : prev.filter((k) => k !== id),
    );
  };

const handleSelectAll = (checked: boolean) => {
    setSelectedRowKeys(checked ? pendingRecords.map((item) => item.id) : []);
  };

const handleCompleteClaim = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先勾选需要领签的明细');
      return;
    }
    setRecords((prev) =>
      prev.map((item) =>
        selectedRowKeys.includes(item.id) ? { ...item, status: 'claimed' } : item,
      ),
    );
    setSelectedRowKeys([]);
    message.success('已完成领签，结果已同步至飞码');
  };

const columns: ProColumns<ClaimItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
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
      title: '领签状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
const s = STATUS_MAP[record.status];
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
    {
      title: '勾选',
      key: 'selection',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          disabled={record.status !== 'pending'}
          onChange={(e) => handleToggleRow(record.id, e.target.checked)}
          data-action-id="toggle_row"
          data-control-id="toggle_row-control"
          data-ui-effect="切换该条明细的勾选状态"
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        variant="borderless"
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: 20 } }}
      >
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Title
            level={3}
            style={{ margin: 0 }}
            data-information-item-id="page_title"
            data-control-id="page_title-display"
          >
            门禁卡领用
          </Title>
          <Text
            type="secondary"
            data-information-item-id="sync_note"
            data-control-id="sync_note-display"
          >
            所有字段信息直接从扫码获取，并实时同步到飞码
          </Text>
        </Space>
      </Card>

      <Card
        variant="borderless"
        styles={{ body: { padding: 16 } }}
        style={{ marginBottom: 16 }}
      >
        <Space
          style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }}
          wrap
        >
          <Space
            data-information-item-id="selection_state"
            data-control-id="selection_state-display"
          >
            <Checkbox
              checked={allPendingSelected}
              indeterminate={selectedRowKeys.length > 0 && !allPendingSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              data-action-id="select_all"
              data-control-id="select_all-control"
              data-ui-effect="一键勾选或取消勾选全部待领签明细"
            >
              全选
            </Checkbox>
            <Text type="secondary">
              已选 {selectedRowKeys.length} / {pendingRecords.length} 条待领签
            </Text>
          </Space>
        </Space>

        <div
          data-information-item-id="claim_list"
          data-control-id="claim_list-display"
        >
          <ProTable<ClaimItem>
            columns={columns}
            dataSource={records}
            rowKey="id"
            search={false}
            options={false}
            toolBarRender={false}
            pagination={{
              pageSize: 6,
              showSizeChanger: false,
              showTotal: (t) => `共 ${t} 条`,
            }}
            size="middle"
          />
        </div>
      </Card>

      <Card
        variant="borderless"
        styles={{ body: { padding: 16 } }}
        style={{ marginBottom: 16 }}
      >
        <Space wrap size={12}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleCompleteClaim}
            data-action-id="complete_claim"
            data-control-id="complete_claim-control"
          >
            完成领签
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
      </Card>

      <Card variant="borderless" styles={{ body: { padding: 16 } }}>
        <div
          data-information-item-id="bottom_icons"
          data-control-id="bottom_icons-display"
        >
          <Space
            size={40}
            style={{ width: '100%', justifyContent: 'space-around', flexWrap: 'wrap' }}
          >
            {bottomIcons.map((item) => (
              <Space key={item.key} direction="vertical" align="center" size={4}>
                <div style={{ fontSize: 22, color: 'rgba(0,0,0,0.65)' }}>{item.icon}</div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.label}
                </Text>
              </Space>
            ))}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default CardClaim;