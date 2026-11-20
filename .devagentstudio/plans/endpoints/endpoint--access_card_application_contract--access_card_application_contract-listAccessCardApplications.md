# Endpoint 字段映射：GET /api/access-card-applications

- API Contract：`access_card_application_contract`
- Endpoint：`access_card_application_contract.listAccessCardApplications`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 318ee4ef28a14ab48e7bd1cb346224fb -->

## 静态数据

```json
{
  "total": 3,
  "pageSize": 10,
  "current": 1,
  "list": [
    {
      "id": "app-2024001",
      "name": "张三",
      "employeeNo": "12345678",
      "cardNo": "8888888",
      "claimStatus": "待领签"
    },
    {
      "id": "app-2024002",
      "name": "李四",
      "employeeNo": "12345679",
      "cardNo": "8888889",
      "claimStatus": "已领签"
    },
    {
      "id": "app-2024003",
      "name": "王五",
      "employeeNo": "12345680",
      "cardNo": "8888890",
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
