# Endpoint 字段映射：GET /api/deactivation-submissions

- API Contract：`contract_deactivation_submission`
- Endpoint：`contract_deactivation_submission.list`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 9104f6da12654c2d9236f3481f761b87 -->

## 静态数据

```json
{
  "total": 3,
  "pageSize": 3,
  "current": 1,
  "list": [
    {
      "id": "card_1001",
      "employeeName": "张三",
      "employeeNo": "EMP20240101",
      "cardNo": "80001234",
      "permissionStatus": "使用中"
    },
    {
      "id": "card_1002",
      "employeeName": "李四",
      "employeeNo": "EMP20240102",
      "cardNo": "80001235",
      "permissionStatus": "使用中"
    },
    {
      "id": "card_1003",
      "employeeName": "王五",
      "employeeNo": "EMP20240103",
      "cardNo": "80001236",
      "permissionStatus": "使用中"
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

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
