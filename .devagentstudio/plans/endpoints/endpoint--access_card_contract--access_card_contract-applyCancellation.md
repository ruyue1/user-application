# Endpoint 字段映射：PATCH /api/access-cards/cancellation

- API Contract：`access_card_contract`
- Endpoint：`access_card_contract.applyCancellation`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 6bcf333bcfb84cd3945cac5c9ca020f1 -->

## 静态数据

```json
{
  "id": "AC-20240613-001",
  "name": "林晓彤",
  "employeeNo": "EMP10023",
  "cardNo": "CARD-88231047",
  "permissionStatus": "正常",
  "cancellationApplication": "离职"
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
- 直接映射 → 静态数据.name → response.response_body.name
- 直接映射 → 静态数据.employeeNo → response.response_body.employeeNo
- 直接映射 → 静态数据.cardNo → response.response_body.cardNo
- 直接映射 → 静态数据.permissionStatus → response.response_body.permissionStatus
- 直接映射 → 静态数据.cancellationApplication → response.response_body.cancellationApplication

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
