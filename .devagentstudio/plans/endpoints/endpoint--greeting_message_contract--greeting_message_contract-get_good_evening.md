# Endpoint 字段映射：GET /api/greetings/good-evening

- API Contract：`greeting_message_contract`
- Endpoint：`greeting_message_contract.get_good_evening`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 0dd1dcca0a8e40219580fb6b7a673e19 -->

## 静态数据

```json
{
  "greetingText": "示例晚间问候：祝您度过一个宁静愉快的夜晚"
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.greetingText → response.response_body.greetingText

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
