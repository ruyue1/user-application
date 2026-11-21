# Endpoint 字段映射：GET /api/access-card-claim-applications

- API Contract：`contract_access_card_claim_application`
- Endpoint：`contract_access_card_claim_application.list`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 39e00fe85d704ba2812fb05b362d0ea8 -->

## 静态数据

```json
{
  "total": 3,
  "pageSize": 3,
  "current": 1,
  "list": [
    {
      "id": "AC-20240612-001",
      "employeeName": "林晓舟",
      "employeeNo": "EMP10086",
      "cardNo": "CARD-8842015",
      "claimStatus": "待领签"
    },
    {
      "id": "AC-20240612-002",
      "employeeName": "赵一鸣",
      "employeeNo": "EMP10087",
      "cardNo": "CARD-8842016",
      "claimStatus": "已领签"
    },
    {
      "id": "AC-20240612-003",
      "employeeName": "陈思远",
      "employeeNo": "EMP10088",
      "cardNo": "CARD-8842017",
      "claimStatus": "待领签"
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

- 直接映射 → 静态数据.total → response.response_body.total
- 直接映射 → 静态数据.pageSize → response.response_body.pageSize
- 直接映射 → 静态数据.current → response.response_body.current
- 直接映射 → 静态数据.list[].id → response.response_body.list[].id
- 直接映射 → 静态数据.list[].employeeName → response.response_body.list[].employeeName
- 直接映射 → 静态数据.list[].employeeNo → response.response_body.list[].employeeNo
- 直接映射 → 静态数据.list[].cardNo → response.response_body.list[].cardNo
- 直接映射 → 静态数据.list[].claimStatus → response.response_body.list[].claimStatus

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
