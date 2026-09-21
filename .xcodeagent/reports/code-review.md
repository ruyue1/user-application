# 代码审查报告

## 审查结论

- 状态：已完成
- 结论：发现 2 个需要处理的问题。
- 问题总数：2

## 扫描汇总

| 范围 | 扫描根目录 | 状态 | 文件总数 |
| --- | --- | --- | ---: |
| 前端 | `frontend` | 已完成 | 3 |
| 后端 | `backend/src/main/java` | 已完成 | 12 |

**前后端扫描文件总数：15**

## 扫描提示

- 无

## 问题详情

### 1. form-data 间接依赖版本存在安全风险 (2.3.2)

- 严重级别：高风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/pnpm-lock.yaml:2017`
- 说明：frontend/pnpm-lock.yaml 中解析出 form-data@2.3.2（由 request@2.88.2 间接引入），低于安全范围 [2.5.4, 3.0.0) / [3.0.4, 4.0.0) / >=4.0.4，属于风险版本。锁文件中同时存在安全的 form-data@4.0.6，但只要有一个解析结果不安全即视为安全问题。修复方案为在 package.json 添加 pnpm.overrides 覆盖 form-data 为 4.0.5、在 pnpm-workspace.yaml 添加 overrides 并执行 pnpm i 更新锁文件。

### 2. axios 直接依赖声明版本范围低于安全下限

- 严重级别：中风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/package.json:23`
- 说明：frontend/package.json 的 dependencies 中声明 axios 为 ^1.3.6，其允许的版本下界 1.3.6 落在风险范围 [1.0.0, 1.15.0) 内，未满足 >=1.15.0 的安全要求（当前 pnpm-lock.yaml 解析结果为安全的 axios@1.20.0）。按技能规则应将该依赖声明改为 1.15.0。
