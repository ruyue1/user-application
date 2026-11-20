# Endpoint 字段映射：PATCH /api/access-card-applications/claim

- API Contract：`access_card_application_contract`
- Endpoint：`access_card_application_contract.completeClaim`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: c59543c0dc62491184c2058e6af4e81d -->

## 静态数据

```json
{
  "updatedCount": 3,
  "list": [
    {
      "id": "AC-CLAIM-20240612-001",
      "name": "林晓桐",
      "employeeNo": "83451267",
      "cardNo": "7001452",
      "claimStatus": "已领签"
    },
    {
      "id": "AC-CLAIM-20240612-002",
      "name": "赵丙坤",
      "employeeNo": "83509118",
      "cardNo": "7001637",
      "claimStatus": "待领签"
    },
    {
      "id": "AC-CLAIM-20240612-003",
      "name": "周慧敏",
      "employeeNo": "83674203",
      "cardNo": "7001984",
      "claimStatus": "已领签"
    }
  ]
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.updatedCount → response.response_body.updatedCount
- 直接映射 → 静态数据.list[].id → response.response_body.list[].id
- 直接映射 → 静态数据.list[].name → response.response_body.list[].name
- 直接映射 → 静态数据.list[].employeeNo → response.response_body.list[].employeeNo
- 直接映射 → 静态数据.list[].cardNo → response.response_body.list[].cardNo
- 直接映射 → 静态数据.list[].claimStatus → response.response_body.list[].claimStatus

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
