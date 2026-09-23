# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page PC client renders the single age-entry page at /page/page-age-entry with a side navigation layout, enabled header, disabled footer, and no authentication. It communicates with the backend through REST JSON APIs and performs client-side validation before submission.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### AgeRecord (`AgeRecord`)

A single age value submitted by an age-entry user and persisted by the backend.

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 记录ID | number | 是 | Unique identifier of the age record. |
| `age_value` | 年龄数值 | number | 是 | The age value submitted by the user and saved by the backend. |
| `created_at` | 创建时间 | datetime | 是 | The time when the age record was created. |

## API 契约

### `/api/age-entry` age_entry_api

#### 字段 Schema

- `AgeSubmitInput`：`age_value` integer 必填
- `AgeSubmitOutput`：`recordId` integer 必填；`savedAgeValue` integer 必填；`message` string 必填

#### Endpoint

- `age_entry_api.submit` · `POST /api/age-entry`：Validate and persist a single age value submitted from the age-entry page, returning a success result without exposing any age listing.
  - 参数：无
  - 请求 Schema：AgeSubmitInput
  - 响应 Schema：AgeSubmitOutput
  - 错误码：`INVALID_AGE`、`INTERNAL_ERROR`

## 页面技术引用

### `page_age_entry`

Endpoint 依赖：
  - `age_entry_api.submit`：submit_age；触发=User clicks the submit button after entering an age；首屏必需=False

业务 Action 实现：
  - `page_age_entry_submit_age`：{"endpointId": "age_entry_api.submit"}

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
