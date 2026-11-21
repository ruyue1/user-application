# 代码审查报告

## 审查结论

- 状态：已完成
- 结论：发现 2 个需要处理的问题。
- 问题总数：2
- 审查模式：全量审查
- 实际审查文件数：17
- 跳过文件数：0

## 扫描汇总

| 范围 | 扫描根目录 | 状态 | 文件总数 |
| --- | --- | --- | ---: |
| 前端 | `frontend` | 已完成 | 3 |
| 后端 | `backend/src/main/java` | 已完成 | 14 |

**前后端扫描文件总数：17**

## 扫描提示

- 无

## 问题详情

### 1. axios 直接依赖版本存在安全风险

- 严重级别：高风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/package.json:23`
- 说明：package.json 的 dependencies 中声明了 axios 版本为 ^1.3.6，允许落入风险版本范围 [1.0.0, 1.15.0)，不符合 >=1.15.0 的安全版本要求。需按规范将 axios 升级至 1.15.0 并配置 overrides 后执行 pnpm i 更新锁文件。

### 2. form-data 间接依赖版本存在安全风险

- 严重级别：高风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/pnpm-lock.yaml:1767`
- 说明：pnpm-lock.yaml 中解析出间接依赖 form-data@2.3.2，低于安全下限 2.5.4，不满足安全版本范围（[2.5.4, 3.0.0)、[3.0.4, 4.0.0) 或 >=4.0.4）。需在 package.json 与 pnpm-workspace.yaml 中配置 form-data: 4.0.5 的 overrides，并执行 pnpm i 更新锁文件。
