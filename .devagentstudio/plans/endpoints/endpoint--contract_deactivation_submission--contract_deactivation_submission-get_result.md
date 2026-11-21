# Endpoint 字段映射：GET /api/deactivation-submissions/{id}

- API Contract：`contract_deactivation_submission`
- Endpoint：`contract_deactivation_submission.get_result`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: f54c49e1bc6448c7bce013faac1dfb42 -->

## 静态数据

```json
{
  "id": "SUB-20240617-001",
  "cardId": "CARD-000123",
  "employeeName": "张明远",
  "employeeNo": "EMP20180356",
  "cardNo": "6221000000001234",
  "deactivationApply": "已提交",
  "syncStatus": "同步成功",
  "processStatus": "审批中",
  "submittedAt": "2024-06-17 09:32:15"
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
