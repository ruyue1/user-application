# Endpoint 字段映射：GET /api/greetings/welcome-world

- API Contract：`greeting_message_contract`
- Endpoint：`greeting_message_contract.get_welcome_world`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: c2d55657f3cf493daa6e37ea2944f767 -->

## 静态数据

```json
{
  "greetingText": "你好，欢迎来到示例测试世界！"
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
