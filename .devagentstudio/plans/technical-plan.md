# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page PC administration client with side navigation, header enabled and footer disabled, communicates with the service through REST JSON APIs.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### AgeEntry (`AgeEntry`)

Age entry business entity representing a submitted age value.

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 记录ID | number | 是 | Unique identifier of the age entry record. |
| `age` | 年龄 | number | 是 | The age value submitted by the data entry operator. |
| `created_at` | 创建时间 | datetime | 是 | Timestamp when the age entry was saved. |

## API 契约

### `/api/age-entry` age_entry_api

#### 字段 Schema

- `AgeEntryCreateInput`：`age` integer 必填
- `AgeEntryCreateOutput`：`id` integer 必填；`age` integer 必填；`createdAt` string 必填；`message` string 必填

#### Endpoint

- `age_entry_api.create` · `POST /api/age-entry`：Validate and persist a submitted age value, returning a success message or validation error.
  - 参数：无
  - 请求 Schema：AgeEntryCreateInput
  - 响应 Schema：AgeEntryCreateOutput
  - 错误码：`VALIDATION_ERROR`、`INTERNAL_ERROR`

## 页面技术引用

### `age_entry_home`

Endpoint 依赖：
  - `age_entry_api.create`：action；触发=User submits the age entry form；首屏必需=False

业务 Action 实现：
  - `age_entry_home_submit_age`：{"endpointId": "age_entry_api.create"}

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
