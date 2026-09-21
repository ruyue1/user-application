# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A PC-oriented single-page client renders one home page inside a sidebar navigation layout with header enabled and footer disabled. The current time, including date and hours-minutes-seconds, is generated from the client clock on load and refreshed continuously via a local timer, requiring no user interaction and no navigation entries to other pages.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

- 无

## API 契约

- 无

## 页面技术引用

### `home`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
