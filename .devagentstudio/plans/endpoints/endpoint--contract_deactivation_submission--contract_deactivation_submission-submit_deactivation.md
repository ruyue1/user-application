# Endpoint 字段映射：POST /api/deactivation-submissions

- API Contract：`contract_deactivation_submission`
- Endpoint：`contract_deactivation_submission.submit_deactivation`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 185f25fd684444a0b3b45acaa5a72273 -->

## 静态数据

```json
{
  "id": "1001",
  "cardId": "CARD-20261121-0001",
  "employeeName": "张三",
  "employeeNo": "EMP08032",
  "cardNo": "C168888888",
  "deactivationApply": "已提交注销申请",
  "syncStatus": "SYNCED",
  "processStatus": "PROCESSING",
  "submittedAt": "2026-11-21 10:30:00"
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.id → response.response_body.id
- 直接映射 → 静态数据.cardId → response.response_body.cardId
- 直接映射 → 静态数据.employeeName → response.response_body.employeeName
- 直接映射 → 静态数据.employeeNo → response.response_body.employeeNo
- 直接映射 → 静态数据.cardNo → response.response_body.cardNo
- 直接映射 → 静态数据.deactivationApply → response.response_body.deactivationApply
- 直接映射 → 静态数据.syncStatus → response.response_body.syncStatus
- 直接映射 → 静态数据.processStatus → response.response_body.processStatus
- 直接映射 → 静态数据.submittedAt → response.response_body.submittedAt

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
