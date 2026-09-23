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

### 1. 间接依赖 form-data 版本 2.3.2 低于安全下限 2.5.4

- 严重级别：高风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/pnpm-lock.yaml:2017`
- 说明：pnpm-lock.yaml 中解析出的 form-data@2.3.2（由 request@2.88.2 间接引入）不属于安全版本范围（[2.5.4, 3.0.0)、[3.0.4, 4.0.0)、>=4.0.4 之一），同一锁定文件中另存在安全的 form-data@4.0.6。按技能修复方案：在 package.json 的 dependencies 同级添加 pnpm.overrides，将 form-data 固定为 4.0.5，并在 pnpm-workspace.yaml 添加 overrides，然后执行 pnpm i 更新 pnpm-lock.yaml。

### 2. axios 依赖声明 ^1.3.6 未限定在安全范围 >=1.15.0

- 严重级别：中风险
- 规则 ID：`unknown`
- 范围：前端
- 文件位置：`frontend/package.json:23`
- 说明：package.json 的 dependencies 中 axios 声明为 ^1.3.6，该范围允许解析到 [1.0.0, 1.15.0) 内的风险版本（当前 pnpm-lock.yaml 解析结果为安全的 1.20.0）。按技能修复方案，应将 axios 声明版本改为 1.15.0；由于锁定版本已在安全范围内，无需再追加 pnpm.overrides。
