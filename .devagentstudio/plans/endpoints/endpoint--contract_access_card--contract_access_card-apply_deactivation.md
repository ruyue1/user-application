# Endpoint 字段映射：POST /api/access-cards/{id}/deactivation-application

- API Contract：`contract_access_card`
- Endpoint：`contract_access_card.apply_deactivation`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: b9f948f12dbe442d9335d39872e72bbd -->

## 静态数据

```json
{
  "id": "AC-20241015-001",
  "employeeName": "张明远",
  "employeeNo": "EMP10021",
  "cardNo": "CARD-8F2A-1937",
  "permissionStatus": "已停用",
  "deactivationApplication": "离职"
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
- 直接映射 → 静态数据.employeeName → response.response_body.employeeName
- 直接映射 → 静态数据.employeeNo → response.response_body.employeeNo
- 直接映射 → 静态数据.cardNo → response.response_body.cardNo
- 直接映射 → 静态数据.permissionStatus → response.response_body.permissionStatus
- 直接映射 → 静态数据.deactivationApplication → response.response_body.deactivationApplication

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
