import { useCallback, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  fetchPersonnelList,
  type PersonnelListItem,
  type PersonnelListParams,
} from '@/apis/personnelContractApi';

/** 列表行标识：优先使用稳定的业务 ID，缺失时退回行索引。 */
const getPersonnelRowKey = (record: PersonnelListItem, index?: number) =>
  record.id != null ? `personnel-${record.id}` : `personnel-index-${index ?? 0}`;

/** 人员明细列表页各列展示配置。 */
const personnelColumns: ProColumns<PersonnelListItem>[] = [
  { title: '姓名', dataIndex: 'name', key: 'name', ellipsis: true },
  { title: '性别', dataIndex: 'gender', key: 'gender', width: 80 },
  { title: '出生日期', dataIndex: 'birthDate', key: 'birthDate', width: 120 },
  { title: '电子邮箱', dataIndex: 'email', key: 'email', ellipsis: true },
  { title: '所属部门', dataIndex: 'department', key: 'department', ellipsis: true },
  { title: '职位', dataIndex: 'position', key: 'position', ellipsis: true },
  { title: '入职日期', dataIndex: 'hireDate', key: 'hireDate', width: 120 },
  { title: '备注', dataIndex: 'remark', key: 'remark', ellipsis: true },
];

/** 人员明细列表页：以只读列表集中浏览人员信息。 */
const PersonnelDetailList = () => {
  const [paginationParams, setPaginationParams] = useState<PersonnelListParams>({
    current: 1,
    pageSize: 20,
  });

  const { data, loading, error, run } = useRequest(
    () => fetchPersonnelList(paginationParams),
    {
      refreshDeps: [paginationParams],
    },
  );

  /** 刷新当前页数据，失败时仍保留可重试的失败视图。 */
  const handleRetry = useCallback(() => {
    run();
  }, [run]);

  // 查询失败：展示明确的失败视图与重试入口，不伪装为空结果
  if (error) {
    return (
      <PageContainer header={{ title: '人员明细' }}>
        <Result
          status="error"
          title="人员明细加载失败"
          subTitle="请检查网络后重试。"
          extra={
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={handleRetry}
            >
              重新加载
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer header={{ title: '人员明细' }}>
      <ProTable<PersonnelListItem>
        rowKey={getPersonnelRowKey}
        columns={personnelColumns}
        dataSource={data?.list ?? []}
        loading={loading}
        search={false}
        options={false}
        toolBarRender={false}
        headerTitle="人员明细"
        pagination={{
          current: data?.current ?? paginationParams.current,
          pageSize: data?.pageSize ?? paginationParams.pageSize,
          total: data?.total ?? 0,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (current, pageSize) => {
            setPaginationParams({ current, pageSize });
          },
        }}
      />
    </PageContainer>
  );
};

export default PersonnelDetailList;
