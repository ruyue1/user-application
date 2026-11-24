# Endpoint 字段映射：GET /greeting

- API Contract：`greeting_contract`
- Endpoint：`greeting_contract.getGreeting`
- 数据库操作：`read`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 46aa44908ebc4d3e91f6a025c0e7bfe5 -->

## 接口映射说明

> 用于问候展示页加载后居中展示问候语。接口返回固定字符串「晚上好！」，不依赖数据库查询条件。

## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- response.response_body.message ← 固定值 '晚上好！'

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

### studio `ds-0cafd44bf2b1444f`（database）
- 映射字段：无
