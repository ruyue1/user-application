# Endpoint 字段映射：GET /api/greetings/noon

- API Contract：`greeting_contract`
- Endpoint：`greeting_contract.get_noon_greeting`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: befbbafb08b644a8be82489baf5db191 -->

## 静态数据

```json
{
  "noonGreetingText": "中午好！"
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.noonGreetingText → response.response_body.noonGreetingText

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
