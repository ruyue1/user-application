# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page PC administration client renders two static display pages (欢迎页 and Agent 欢迎页) with side navigation, an enabled page header, and a disabled footer; it performs no backend API calls and requires no login.
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

### `agent_welcome`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
