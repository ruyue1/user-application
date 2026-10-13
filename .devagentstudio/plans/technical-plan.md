# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page administration client with a side navigation layout, header enabled and footer disabled, communicates with the service through REST JSON APIs.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### AgeRecord (`AgeRecord`)

年龄录入记录实体，保存录入人员提交的年龄数据

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 记录ID | number | 是 | 年龄录入记录的唯一标识 |
| `age` | 年龄 | number | 是 | 录入人员提交的年龄数值 |
| `created_at` | 创建时间 | datetime | 是 | 记录创建时间 |

## API 契约

### `/api/age` age_api

#### 字段 Schema

- `AgeSubmitInput`：`age` integer 必填
- `AgeSubmitOutput`：`id` integer 必填；`age` integer 必填；`createdAt` string 必填；`message` string 必填

#### Endpoint

- `age_api.submit` · `POST /api/age`：录入人员提交年龄数据，后端将年龄保存至数据库并返回保存结果
  - 参数：无
  - 请求 Schema：AgeSubmitInput
  - 响应 Schema：AgeSubmitOutput
  - 错误码：`VALIDATION_ERROR`、`INTERNAL_ERROR`

## 页面技术引用

### `page_age_input`

Endpoint 依赖：
  - `age_api.submit`：action；触发=录入人员点击提交按钮；首屏必需=False

业务 Action 实现：
  - `page_age_input_submit_age`：{"endpointId": "age_api.submit"}

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
