# Endpoint 字段映射：GET /api/access-cards

- API Contract：`access_card_contract`
- Endpoint：`access_card_contract.listAccessCards`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 97bb2850a2eb4e1fb5535fea32b99c54 -->

## 静态数据

```json
{
  "total": 3,
  "pageSize": 3,
  "current": 1,
  "list": [
    {
      "id": "card_7f3a2b91",
      "name": "林晓舟",
      "employeeNo": "EMP20481",
      "cardNo": "AC202400137",
      "permissionStatus": "正常",
      "cancellationApplication": "无"
    },
    {
      "id": "card_9c4e6d52",
      "name": "赵沐辰",
      "employeeNo": "EMP20736",
      "cardNo": "AC202400582",
      "permissionStatus": "正常",
      "cancellationApplication": "离职"
    },
    {
      "id": "card_1b8f5a03",
      "name": "陈书瑶",
      "employeeNo": "EMP21059",
      "cardNo": "AC202401096",
      "permissionStatus": "已冻结",
      "cancellationApplication": "无"
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
- 直接映射 → 静态数据.list[].permissionStatus → response.response_body.list[].permissionStatus
- 直接映射 → 静态数据.list[].cancellationApplication → response.response_body.list[].cancellationApplication

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
