# Endpoint 字段映射：GET /api/greetings/my-world

- API Contract：`greeting_contract`
- Endpoint：`greeting_contract.get_my_world_greeting`
- 数据库操作：`无数据库映射`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 17c114564d2846d2845836880271c622 -->

## 静态数据

```json
{
  "myWorldGreetingText": "欢迎来到我的世界！这里是虚构测试环境的随机问候语_8742"
}
```


## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- 直接映射 → 静态数据.myWorldGreetingText → response.response_body.myWorldGreetingText

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

- 未选择数据来源。
