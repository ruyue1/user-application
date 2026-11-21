import React, { useMemo, useState } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { Button, Space, Tag, Typography, Card, Alert, Modal, message, theme } from 'antd';
import {
  CheckCircleOutlined,
  ArrowLeftOutlined,
  IdcardOutlined,
  SyncOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  FileProtectOutlined,
  ScanOutlined,
} from '@ant-design/icons';

type ClaimStatus = 'pending' | 'claimed';

type CardClaimItem = {
  id: string;
  name: string;
  employeeNo: string;
  cardNo: string;
  status: ClaimStatus;
};

const initialMockData: CardClaimItem[] = [
  { id: '1', name: '张伟', employeeNo: 'EMP20260101', cardNo: 'AC-8801-2245', status: 'pending' },
  { id: '2', name: '李娜', employeeNo: 'EMP20260102', cardNo: 'AC-8801-2246', status: 'pending' },
  { id: '3', name: '王强', employeeNo: 'EMP20260103', cardNo: 'AC-8801-2247', status: 'pending' },
  { id: '4', name: '刘洋', employeeNo: 'EMP20260104', cardNo: 'AC-8801-2248', status: 'pending' },
  { id: '5', name: '陈静', employeeNo: 'EMP20260105', cardNo: 'AC-8801-2249', status: 'pending' },
  { id: '6', name: '赵敏', employeeNo: 'EMP20260106', cardNo: 'AC-8801-2250', status: 'pending' },
  { id: '7', name: '孙磊', employeeNo: 'EMP20260107', cardNo: 'AC-8801-2251', status: 'pending' },
  { id: '8', name: '周婷', employeeNo: 'EMP20260108', cardNo: 'AC-8801-2252', status: 'pending' },
  { id: '9', name: '吴昊', employeeNo: 'EMP20260109', cardNo: 'AC-8801-2253', status: 'pending' },
  { id: '10', name: '郑爽', employeeNo: 'EMP20260110', cardNo: 'AC-8801-2254', status: 'pending' },
  { id: '11', name: '冯磊', employeeNo: 'EMP20260111', cardNo: 'AC-8801-2255', status: 'pending' },
  { id: '12', name: '楚涵', employeeNo: 'EMP20260112', cardNo: 'AC-8801-2256', status: 'pending' },
];

const STATUS_MAP: Record<ClaimStatus, { text: string; color: string }> = {
  pending: { text: '待领签', color: 'orange' },
  claimed: { text: '已领签', color: 'green' },
};

const bottomIcons = [
  { key: 'scan', label: '扫码识别', icon: <ScanOutlined /> },
  { key: 'card', label: '卡片信息', icon: <IdcardOutlined /> },
  { key: 'sync', label: '飞码同步', icon: <SyncOutlined /> },
  { key: 'secure', label: '安全认证', icon: <SafetyCertificateOutlined /> },
];

const InfoIcon: React.FC = () => <QrcodeOutlined style={{ fontSize: 16 }} />;

const CardClaim: React.FC = () => {
const { token } = theme.useToken();
const [dataSource, setDataSource] = useState<CardClaimItem[]>(initialMockData);
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
const [confirmOpen, setConfirmOpen] = useState(false);
const [messageApi, contextHolder] = message.useMessage();

const pendingRows = useMemo(
    () => dataSource.filter((item) => item.status === 'pending'),
    [dataSource],
  );

const handleCompleteClaim = () => {
    setConfirmOpen(false);
const targets = selectedRowKeys.map(String);
    setDataSource((prev) =>
      prev.map((item) =>
        targets.includes(item.id) ? { ...item, status: 'claimed' } : item,
      ),
    );
    setSelectedRowKeys([]);
    messageApi.success('签收成功，领签状态已同步至飞码');
  };

const columns: ProColumns<CardClaimItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 140,
    },
    {
      title: '员工编号',
      dataIndex: 'employeeNo',
      key: 'employeeNo',
      width: 180,
    },
    {
      title: '卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
      width: 200,
    },
    {
      title: '领签状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (_, record) => {
const s = STATUS_MAP[record.status];
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
            data-information-item-id="page_title"
            data-control-id="page_title-display"
          >
            <SafetyCertificateOutlined style={{ marginRight: 8 }} />
            门禁卡领用
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
          icon={<InfoIcon />}
          message="所有字段信息直接从扫码获取，并实时同步到飞码。"
          data-information-item-id="claim_notice"
          data-control-id="claim_notice-display"
        />

        <Card
          styles={{ body: { padding: 0 } }}
          title={
            <Space>
              <FileProtectOutlined />
              <span>待领签申请明细</span>
            </Space>
          }
        >
          <ProTable<CardClaimItem>
            columns={columns}
            dataSource={pendingRows}
            rowKey="id"
            search={false}
            options={false}
            cardBordered={false}
            data-information-item-id="claim_detail_table"
            data-control-id="claim_detail_table-display"
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
              showTotal: (total) => `共 ${total} 条待领签明细`,
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
              getCheckboxProps: () => ({
                'data-action-id': 'select_row',
                'data-control-id': 'select_row-control',
                'data-ui-effect': '勾选或取消勾选该申请明细行',
              }),
            }}
            tableAlertRender={({ selectedRowKeys: keys }) => (
              <Space size={16}>
                <span>已选择 {keys.length} 项</span>
              </Space>
            )}
            tableAlertOptionRender={() => (
              <Space size={16}>
                <Button
                  type="link"
                  size="small"
                  onClick={() => setSelectedRowKeys(pendingRows.map((item) => item.id))}
                  data-action-id="select_all"
                  data-control-id="select_all-control"
                  data-ui-effect="全选当前列表全部待领签明细"
                >
                  一键全选
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => setSelectedRowKeys([])}
                  data-preview-only="true"
                >
                  取消选择
                </Button>
              </Space>
            )}
            toolBarRender={() => [
              <Button
                key="selectAll"
                onClick={() => setSelectedRowKeys(pendingRows.map((item) => item.id))}
                data-action-id="select_all"
                data-control-id="select_all-control"
                data-ui-effect="全选当前列表全部待领签明细"
              >
                一键全选
              </Button>,
              <Button
                key="complete"
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  if (selectedRowKeys.length === 0) {
                    messageApi.warning('请先勾选需要签收的申请明细');
                    return;
                  }
                  setConfirmOpen(true);
                }}
                data-action-id="complete_claim"
                data-control-id="complete_claim-control"
                data-ui-effect="提交已勾选明细完成领用签收并将状态同步至飞码"
              >
                完成领签
              </Button>,
            ]}
          />
        </Card>

        <Card styles={{ body: { padding: '20px 24px' } }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
            data-information-item-id="bottom_icons"
            data-control-id="bottom_icons-display"
          >
            {bottomIcons.map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  color: token.colorTextTertiary,
                  minWidth: 88,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    background: token.colorFillTertiary,
                    color: token.colorPrimary,
                  }}
                >
                  {item.icon}
                </div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {item.label}
                </Typography.Text>
              </div>
            ))}
          </div>
        </Card>
      </Space>

      <Modal
        open={confirmOpen}
        title="确认完成领签"
        okText="确认签收"
        cancelText="取消"
        onOk={handleCompleteClaim}
        onCancel={() => setConfirmOpen(false)}
      >
        <Space direction="vertical" size={8}>
          <span>即将对已勾选的 {selectedRowKeys.length} 条申请明细完成领用签收。</span>
          <Typography.Text type="secondary">
            签收完成后，领签状态将更新为「已领签」并实时同步至飞码。
          </Typography.Text>
        </Space>
      </Modal>
    </div>
  );
};

export default CardClaim;