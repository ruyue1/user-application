# 迭代上下文

> 本文件记录每轮迭代的设计与计划产物摘要，供下一轮迭代的大模型作为起点。

## 分支 dev1（2026-09-23 07:42:41 UTC）

**变更说明**：33

### 应用现状

- 应用名称：年龄录入
- 应用场景：一个页面，页面上有一个输入框，只输入年龄，后端只保存年龄，不需要展示页面
- 目标终端：PC
- 导航布局：布局=side, 页头=启用, 页脚=禁用
- 主题色：#6b3cf0
- 数据源类型：database
- 认证：不启用
- 权限控制：不启用

### 需求规格

> 「年龄录入」是一个面向 PC 端的轻量应用，仅提供一个年龄录入页面：页面包含一个输入框用于填写年龄，提交后由后端仅保存年龄数值，不提供年龄数据的展示页面。导航采用侧边布局，页头启用、页脚禁用，认证不启用，不涉及权限控制，业务角色为年龄录入人员。

**用户角色**：
- 年龄录入人员：在年龄录入页面填写并提交年龄的业务人员

**功能模块**：
- 年龄录入（must）：提供年龄录入页面，接收用户填写的年龄并提交保存，后端仅保存年龄数值

### 产品计划

**页面**：
- **年龄录入**（page_age_entry，路径：/page/page-age-entry）
  - 描述：应用首页兼年龄录入页面，包含一个年龄输入框与提交操作，提交后仅保存年龄数值，不展示已录入数据
  - 目标：让年龄录入人员在一个页面内填写年龄并提交，由后端保存年龄数值，页面不展示已录入的年龄数据

**业务流程**：
- 年龄录入流程
  - 年龄录入人员通过唯一的录入页面填写年龄并提交，后端仅保存该年龄数值
  - 步骤：打开年龄录入页面
  - 步骤：在输入框中填写年龄
  - 步骤：提交年龄
  - 步骤：后端保存年龄数值并返回录入结果

### 技术计划

- 前端架构：A React single-page PC client renders the single age-entry page at /page/page-age-entry with a side navigation layout, enabled header, disabled footer, and no authentication. It communicates with the backend through REST JSON APIs and performs client-side validation before submission.
- 后端架构：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据层：数据库固定使用 MySQL8，缓存固定使用 Redis。

**实体**：
- **AgeRecord**（AgeRecord）
  - 描述：A single age value submitted by an age-entry user and persisted by the backend.
  - 记录ID（id）：number，必填
  - 年龄数值（age_value）：number，必填
  - 创建时间（created_at）：datetime，必填

### 接口设计

- **endpoint--age_entry_api--age_entry_api-submit**

### 数据源

- **年龄录入数据库**（类型：database）
