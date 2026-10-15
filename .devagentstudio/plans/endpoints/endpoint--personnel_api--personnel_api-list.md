# Endpoint 字段映射：GET /api/personnel

- API Contract：`personnel_api`
- Endpoint：`personnel_api.list`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 34d3576c60764fc8a6fd0794eed6399b -->

## 静态数据

```json
{
  "total": 1
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.total → response.response_body.total
- response.response_body.pageSize ← 固定值 1
- response.response_body.current ← 固定值 1
- response.response_body.list[].personnelId ← 固定值 '1'
- response.response_body.list[].name ← 固定值 '1'
- response.response_body.list[].gender ← 固定值 'male'
- response.response_body.list[].department ← 固定值 '1'
- response.response_body.list[].position ← 固定值 'aaa'
- response.response_body.list[].phone ← 固定值 '123'
- response.response_body.list[].email ← 固定值 '3333@'
- response.response_body.list[].hireDate ← 固定值 '333'
- response.response_body.list[].status ← 固定值 '1'
- response.response_body.list[].createdAt ← 固定值 '33'

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
