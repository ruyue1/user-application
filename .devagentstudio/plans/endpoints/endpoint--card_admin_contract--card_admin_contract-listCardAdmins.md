# Endpoint 字段映射：GET /api/card-admins

- API Contract：`card_admin_contract`
- Endpoint：`card_admin_contract.listCardAdmins`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 6ee369fbfe2c4635a4b5269c68d9ad20 -->

## 静态数据

```json
{
  "list": [
    {
      "id": "adc-7f3a-1001",
      "region": "园区",
      "adminName": "李媛",
      "adminNo": "WS04462"
    },
    {
      "id": "adc-7f3a-1002",
      "region": "OCG",
      "adminName": "徐敏",
      "adminNo": "IT006877"
    },
    {
      "id": "adc-7f3a-1003",
      "region": "园区",
      "adminName": "陈立",
      "adminNo": "WS05138"
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

- 直接映射 → 静态数据.list[].id → response.response_body.list[].id
- 直接映射 → 静态数据.list[].region → response.response_body.list[].region
- 直接映射 → 静态数据.list[].adminName → response.response_body.list[].adminName
- 直接映射 → 静态数据.list[].adminNo → response.response_body.list[].adminNo

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
