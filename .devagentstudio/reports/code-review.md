# 代码审查报告

## 审查结论

- 状态：已完成
- 结论：发现 2 个需要处理的问题。
- 问题总数：2
- 审查模式：全量审查
- 实际审查文件数：16
- 跳过文件数：0

## 扫描汇总

| 范围 | 扫描根目录 | 状态 | 文件总数 |
| --- | --- | --- | ---: |
| 前端 | `frontend` | 已完成 | 2 |
| 后端 | `backend/src/main/java` | 已完成 | 14 |

**前后端扫描文件总数：16**

## 扫描提示

- 无

## 问题详情

### 1. 间接依赖 form-data 版本 2.3.2 低于安全下限 2.5.4

- 严重级别：高风险
- 规则 ID：`form-data-version-risk`
- 范围：前端
- 文件位置：`frontend/pnpm-lock.yaml:1757`
- 说明：锁文件中存在 form-data@2.3.2，属于低于 2.5.4 的风险版本区间，由传递依赖 request@2.88.2 引入；同时锁文件中另有 form-data@4.0.6 的安全版本。按规则要求，需在 package.json 增加 pnpm.overrides 将 form-data 固定为 4.0.5，并在 pnpm-workspace.yaml 增加同名 overrides，随后执行 pnpm install 更新锁文件。

### 2. axios 依赖声明范围下限低于安全版本 1.15.0

- 严重级别：低风险
- 规则 ID：`axios-version-risk`
- 范围：前端
- 文件位置：`frontend/package.json:23`
- 说明：dependencies 中 axios 声明为 ^1.3.6，其允许安装的下限版本 1.3.6 落在 [1.0.0, 1.15.0) 风险区间内（当前锁文件解析到的实际版本为 1.20.0，属安全范围，但声明范围未把安全下限收紧）。按规则要求可将声明版本调整为 1.15.0；若锁文件出现低于安全范围的 axios 解析结果，还需在 package.json 增加 pnpm.overrides 并在 pnpm-workspace.yaml 增加同名 overrides 后执行 pnpm install。
