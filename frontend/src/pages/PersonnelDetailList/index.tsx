import { useCallback, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import { Alert, Button, Empty } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { fetchPersonnelList } from '@/apis/personnelApi';
import type { PersonnelListItem } from '@/apis/personnelApi';

/** 人员明细列表查询条件（仅使用 personnel_api.list 声明的查询参数） */
type PersonnelListQuery = {
  /** 模糊查询关键字 */
  keyword?: string;
};

/** ProTable request 入参（ProTable 自动注入分页参数） */
type PersonnelListParams = PersonnelListQuery & {
  current?: number;
  pageSize?: number;
};

export default function PersonnelDetailList() {
  const actionRef = useRef<ActionType>();
  /** 加载失败（LOAD_FAILED）错误态提示 */
  const [loadError, setLoadError] = useState<string | null>(null);

  // 业务接口统一经 src/apis/ + useRequest 调用
  const { runAsync } = useRequest(fetchPersonnelList, { manual: true });

  const handleRequest = useCallback(
    async (params: PersonnelListParams) => {
      const { current = 1, pageSize = 20, keyword } = params;
      try {
        const res = await runAsync({
          current,
          pageSize,
          keyword: keyword ?? undefined,
        });
        setLoadError(null);
        return {
          data: res?.list ?? [],
          success: true,
          total: res?.total ?? 0,
        };
      } catch (error) {
        const msg =
          error instanceof Error && error.message
            ? error.message
            : '人员明细数据加载失败，请稍后重试';
        setLoadError(msg);
        return {
          data: [] as PersonnelListItem[],
          success: false,
          total: 0,
        };
      }
    },
    [runAsync],
  );

  const columns: ProColumns<PersonnelListItem>[] = [
    {
      title: '关键字',
      dataIndex: 'keyword',
      valueType: 'text',
      hideInTable: true,
      fieldProps: { placeholder: '请输入关键字搜索' },
    },
    {
      title: '人员编号',
      dataIndex: 'personnelId',
      valueType: 'text',
      width: 120,
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      width: 120,
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
      width: 80,
      search: false,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      valueType: 'text',
      width: 140,
      search: false,
    },
    {
      title: '岗位',
      dataIndex: 'position',
      valueType: 'text',
      width: 140,
      search: false,
      render: (_, record) => record.position || '-',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      valueType: 'text',
      width: 140,
      search: false,
      render: (_, record) => record.phone || '-',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      width: 200,
      search: false,
      ellipsis: true,
      render: (_, record) => record.email || '-',
    },
    {
      title: '入职日期',
      dataIndex: 'hireDate',
      valueType: 'text',
      width: 120,
      search: false,
      render: (_, record) => record.hireDate || '-',
    },
    {
      title: '在职状态',
      dataIndex: 'status',
      valueType: 'text',
      width: 100,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'text',
      width: 160,
      search: false,
      render: (_, record) => record.createdAt || '-',
    },
  ];

  return (
    <>
      {loadError ? (
        <Alert
          type='error'
          showIcon
          style={{ marginBottom: 16 }}
          message='人员明细数据加载失败'
          description={loadError}
          action={
            <Button
              size='small'
              icon={<ReloadOutlined />}
              onClick={() => actionRef.current?.reload()}
            >
              重试
            </Button>
          }
        />
      ) : null}
      <ProTable<PersonnelListItem, PersonnelListQuery>
        headerTitle='人员明细列表'
        actionRef={actionRef}
        rowKey='personnelId'
        columns={columns}
        search={{ defaultCollapsed: false }}
        request={handleRequest}
        pagination={{
          defaultPageSize: 20,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='暂无人员明细数据'
            />
          ),
        }}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            key='refresh'
            icon={<ReloadOutlined />}
            onClick={() => actionRef.current?.reload()}
          >
            刷新
          </Button>,
        ]}
      />
    </>
  );
}
