# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page administration client with side navigation communicates with the service through REST JSON APIs.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### Personnel (`Personnel`)

人员明细业务实体，承载HR查看的人员详细字段数据。

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `personnel_id` | 人员编号 | text | 是 | 人员的唯一业务编号。 |
| `name` | 姓名 | text | 是 | 人员姓名。 |
| `gender` | 性别 | enum | 是 | 人员性别。 |
| `department` | 所属部门 | text | 是 | 人员所属部门名称。 |
| `position` | 岗位 | text | 否 | 人员当前岗位。 |
| `phone` | 联系电话 | text | 否 | 人员联系电话。 |
| `email` | 邮箱 | text | 否 | 人员电子邮箱。 |
| `hire_date` | 入职日期 | date | 否 | 人员入职日期。 |
| `status` | 在职状态 | enum | 是 | 人员在职状态。 |
| `created_at` | 创建时间 | datetime | 是 | 记录创建时间。 |

## API 契约

### `/api/personnel` personnel_api

#### 字段 Schema

- `PersonnelListItem`：`personnelId` string 必填；`name` string 必填；`gender` string 必填；`department` string 必填；`position` string；`phone` string；`email` string；`hireDate` string；`status` string 必填；`createdAt` string
- `PersonnelListOutput`：`total` integer 必填；`pageSize` integer 必填；`current` integer 必填；`list` array 必填

#### Endpoint

- `personnel_api.list` · `GET /api/personnel`：分页查询人员明细数据，供HR在人员明细列表页面查看人员详细字段信息。
  - 参数：`current` query/integer/可选、`pageSize` query/integer/可选、`keyword` query/string/可选
  - 请求 Schema：无
  - 响应 Schema：PersonnelListOutput
  - 错误码：`LOAD_FAILED`

## 页面技术引用

### `personnel_detail_list`

Endpoint 依赖：
  - `personnel_api.list`：page_load；触发=Page entry or filter submission；首屏必需=True

业务 Action 实现：
  - 无

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
