# 迭代上下文

> 本文件记录每轮迭代的设计与计划产物摘要，供下一轮迭代的大模型作为起点。

## 分支 sbw（2026-09-24 09:19:08 UTC）

**变更说明**：1

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

> 「年龄录入」是一个面向 PC 端的轻量录入应用，由数据录入人员在唯一页面上通过输入框填写年龄并提交，后端仅保存年龄数据，不提供年龄数据的展示页面。应用采用侧边导航布局，启用页头、禁用页脚，数据保存在数据库中，不启用认证，也不涉及权限控制。

**用户角色**：
- 数据录入人员：负责在页面上录入并提交年龄数据的业务人员

**功能模块**：
- 年龄录入（must）：提供年龄输入与提交能力，并将年龄数据保存到后端

### 产品计划

**页面**：
- **年龄录入**（age_entry_home，路径：/page/age-entry-home）
  - 描述：应用首页，页面仅包含一个年龄输入框和提交入口，用于录入年龄；不提供年龄数据的展示区域
  - 目标：让数据录入人员在一个页面上完成年龄的填写与提交，并清楚获知本次录入是否成功。

**业务流程**：
- 年龄录入流程
  - 数据录入人员打开年龄录入页面，填写年龄并提交，系统保存年龄数据
  - 步骤：数据录入人员打开年龄录入页面
  - 步骤：数据录入人员在年龄输入框中填写年龄
  - 步骤：数据录入人员提交年龄信息
  - 步骤：系统校验年龄输入是否有效
  - 步骤：系统在后端保存年龄数据
  - 步骤：系统提示录入结果

### 技术计划

- 前端架构：A React single-page PC administration client with side navigation, header enabled and footer disabled, communicates with the service through REST JSON APIs.
- 后端架构：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据层：数据库固定使用 MySQL8，缓存固定使用 Redis。

**实体**：
- **AgeEntry**（AgeEntry）
  - 描述：Age entry business entity representing a submitted age value.
  - 记录ID（id）：number，必填
  - 年龄（age）：number，必填
  - 创建时间（created_at）：datetime，必填

### 接口设计

- **endpoint--age_entry_api--age_entry_api-create**

### 数据源

- **年龄录入数据库**（类型：database）
