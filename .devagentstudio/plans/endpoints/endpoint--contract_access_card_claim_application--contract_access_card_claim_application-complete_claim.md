# Endpoint 字段映射：POST /api/access-card-claim-applications/complete-claim

- API Contract：`contract_access_card_claim_application`
- Endpoint：`contract_access_card_claim_application.complete_claim`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 9706f61882794bc1a7dab6a19c638c14 -->

## 静态数据

```json
{
  "updatedCount": 3,
  "applicationIds": [
    "APP-20240517-001",
    "APP-20240517-002",
    "APP-20240517-003"
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
- 直接映射 → 静态数据.applicationIds[] → response.response_body.applicationIds[]

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
