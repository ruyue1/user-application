# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page client renders two static display pages (welcome_page and hello_agent_page) inside a shared side-navigation layout with header enabled and footer disabled; no REST calls are made and all content is hard-coded.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

- 无

## API 契约

- 无

## 页面技术引用

### `welcome_page`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

### `hello_agent_page`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
