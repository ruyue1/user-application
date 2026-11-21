# 代码审查报告

## 审查结论

- 状态：已完成
- 结论：审查通过，未发现需要处理的问题。
- 问题总数：0
- 审查模式：Diff 审查
- 实际审查文件数：2
- 跳过文件数：0

## Diff 审查文件

- `frontend/src/apis/contractAccessCardApi.ts`
- `frontend/src/pages/CardReturn/index.tsx`

## 扫描汇总

| 范围 | 扫描根目录 | 状态 | 文件总数 |
| --- | --- | --- | ---: |
| 前端 | `frontend` | 已完成 | 2 |
| 后端 | `backend` | 已跳过 | 0 |

**前后端扫描文件总数：2**

## 扫描提示

- frontend-code-scan 规则仅适用于 package.json 与 pnpm-lock.yaml 中的 npm 包版本检测，本次目标文件不包含上述依赖清单文件，已完整读取全部 2 个前端目标文件但无适用前端扫描规则。
- 本次变更清单未包含后端目标文件，跳过后端扫描。

## 问题详情

未发现需要处理的问题，代码审查通过。
