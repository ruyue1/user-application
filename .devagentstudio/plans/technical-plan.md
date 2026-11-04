# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：React 单页应用客户端在页面上直接渲染写死的字符串内容，不与后端进行任何数据交互。
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

- 无

## API 契约

- 无

## 页面技术引用

### `hello_world`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

### `hello_agent`

Endpoint 依赖：
  - 无

业务 Action 实现：
  - 无

## 接口权限绑定（系统编译，只读）

- 角色、页面/操作资源及默认授权已在需求阶段确认；调整授权请返回需求阶段重新确认。
- 本阶段按业务操作调用的接口生成权限绑定，页面权限与接口权限独立。
- Manifest：`authorization-manifest.v3`
- 指纹：`sha256:322b4621177476bce45b77aeec3acf6bf4bb9ae05e952dcb8e69b82efbb03adc`

Endpoint 操作资源绑定：
| Endpoint | 操作资源 | 裁决 |
| --- | --- | --- |
| 无 | - | - |
