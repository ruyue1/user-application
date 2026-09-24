# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A PC-oriented static single-page client renders two display-only pages (欢迎页 and hello agent 页面) using a side navigation layout with an enabled header and disabled footer; all page content is hard-coded static strings and no client-server communication occurs.
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

### `hello_agent`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
