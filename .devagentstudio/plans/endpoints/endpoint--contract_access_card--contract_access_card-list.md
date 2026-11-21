# Endpoint 字段映射：GET /api/access-cards

- API Contract：`contract_access_card`
- Endpoint：`contract_access_card.list`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 04148f292ee148d2b2b562bcd1943276 -->

## 静态数据

```json
{
  "total": 2,
  "pageSize": 10,
  "current": 1,
  "list": [
    {
      "id": "10001",
      "employeeName": "张三",
      "employeeNo": "E2026001",
      "cardNo": "C008921",
      "permissionStatus": "NORMAL",
      "deactivationAp": ""
    },
    {
      "id": "10002",
      "employeeName": "李四",
      "employeeNo": "E2026002",
      "cardNo": "C008922",
      "permissionStatus": "DEACTIVATED",
      "deactivationAp": "AP005"
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
- 直接映射 → 静态数据.list[].permissionStatus → response.response_body.list[].permissionStatus
- 直接映射 → 静态数据.list[].deactivationAp → response.response_body.list[].deactivationApplication

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
