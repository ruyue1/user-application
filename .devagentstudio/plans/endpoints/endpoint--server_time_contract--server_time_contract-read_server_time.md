# Endpoint 字段映射：GET /api/server-time

- API Contract：`server_time_contract`
- Endpoint：`server_time_contract.read_server_time`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 3cd978e441bf4b95ba4a5da5ed6e761c -->

## 静态数据

```json
{
  "currentTime": ""
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.currentTime → response.response_body.currentTime

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
