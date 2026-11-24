import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import { useRequest } from 'ahooks';
import { useState } from 'react';

import {
  listPersonnelDetails,
  type PersonnelDetailListItem,
} from '@/apis/personnelDetailContractApi';

/** 默认每页条数 */
const DEFAULT_PAGE_SIZE = 20;

/** 人员明细列表表格列定义 */
const columns: ProColumns<PersonnelDetailListItem>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '电子邮箱',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'position',
    ellipsis: true,
  },
  {
    title: '入职日期',
    dataIndex: 'entryDate',
    width: 140,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
  },
];

/** 人员明细列表页：只读分页浏览人员明细信息 */
export default function PersonnelDetailListPage() {
  // 分页查询条件保存在页面状态，作为查询依赖驱动请求
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, loading, error, run } = useRequest(
    () => listPersonnelDetails({ current, pageSize }),
    {
      refreshDeps: [current, pageSize],
    },
  );

  /** 请求失败后按当前页条件重试 */
  const handleRetry = () => {
    run();
  };

  /** 切换分页：更新查询条件，由 useRequest 的 refreshDeps 触发对应页查询 */
  const handlePageChange = (nextCurrent: number, nextPageSize: number) => {
    // 改变每页条数时复位到第一页，保持页码与页容量一致
    if (nextPageSize !== pageSize) {
      setPageSize(nextPageSize);
      setCurrent(1);
      return;
    }
    setCurrent(nextCurrent);
  };

  // 请求失败：展示明确的失败视图与重试入口，不以空列表掩盖错误
  if (error) {
    return (
      <PageContainer header={{ title: '人员明细' }}>
        <Result
          status="error"
          title="人员明细加载失败"
          subTitle="请稍后重试。"
          extra={[
            <Button type="primary" key="retry" onClick={handleRetry}>
              重试
            </Button>,
          ]}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: '人员明细' }}>
      <ProTable<PersonnelDetailListItem>
        rowKey={(record) => String(record.name ?? '')}
        headerTitle="人员明细列表"
        columns={columns}
        dataSource={data?.list ?? []}
        loading={loading}
        search={false}
        options={false}
        toolBarRender={false}
        pagination={{
          current,
          pageSize,
          total: data?.total ?? 0,
          showSizeChanger: true,
          showQuickJumper: false,
          onChange: handlePageChange,
        }}
      />
    </PageContainer>
  );
}
