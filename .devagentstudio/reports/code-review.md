# 代码审查报告

## 审查结论

- 状态：已完成
- 结论：发现 2 个需要处理的问题。
- 问题总数：2
- 审查模式：全量审查
- 实际审查文件数：18
- 跳过文件数：0

## 扫描汇总

| 范围 | 扫描根目录 | 状态 | 文件总数 |
| --- | --- | --- | ---: |
| 前端 | `frontend` | 已完成 | 3 |
| 后端 | `backend/src/main/java` | 已完成 | 15 |

**前后端扫描文件总数：18**

## 扫描提示

- 无

## 问题详情

### 1. axios 依赖声明版本低于安全基线 1.15.0

- 严重级别：高风险
- 规则 ID：`axios-version-risk`
- 范围：前端
- 文件位置：`frontend/package.json:23`
- 说明：dependencies 中声明的 axios 版本范围为 ^1.3.6，允许落入 [1.0.0, 1.15.0) 风险版本区间，需按规范将 dependencies 中的 axios 版本更新为 >=1.15.0（建议设为 1.15.0）并同步更新依赖。

### 2. 间接依赖 form-data 存在低于 2.5.4 的风险版本 2.3.2

- 严重级别：高风险
- 规则 ID：`form-data-version-risk`
- 范围：前端
- 文件位置：`frontend/pnpm-lock.yaml:1757`
- 说明：锁文件中存在间接依赖版本 form-data@2.3.2，低于安全版本下限 2.5.4；需在 frontend/package.json 的 pnpm.overrides 与 frontend/pnpm-workspace.yaml 的 overrides 中将 form-data 固定为 4.0.5，并执行 pnpm i 更新锁文件。
