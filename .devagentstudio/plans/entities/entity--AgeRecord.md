# 实体详细设计：AgeRecord（`AgeRecord`）

## 一、实体基本信息

- 实体 ID：`AgeRecord`
- 实体名称：AgeRecord
- 实体说明：A single age value submitted by an age-entry user and persisted by the backend.
- 所属模块：`未归属`
- 数据源：数据库（`database`）
- 确认状态：已确认

## 二、字段设计

| 字段名 | 展示名称 | 语义类型 | 必填 | 列类型 | 说明 |
| --- | --- | --- | --- | --- | --- |
| `id` | 记录ID | number | 必填 | `BIGINT` | Unique identifier of the age record. |
| `age_value` | 年龄数值 | number | 必填 | `BIGINT` | The age value submitted by the user and saved by the backend. |
| `created_at` | 创建时间 | datetime | 必填 | `DATETIME` | The time when the age record was created. |

## 三、目标表结构

- 表名：`age_record`
- 表注释：A single age value submitted by an age-entry user and persisted by the backend.
- 主键：`id`

列清单：
- `id` BIGINT 非空：主键
- `age_value` BIGINT 非空：年龄数值
- `created_at` DATETIME 非空：创建时间

## 三-A、数据库方案

- 数据库连接：未检测
- 可用表数量：0
- 绑定状态：待绑定
- 目标表：`age_record`

字段绑定：
- `id` -> `.id`（）
- `age_value` -> `.age`（）
- `created_at` -> `.created_at`（）

## 四、业务规则

- 暂无业务规则

## 五、关系设计

- 本轮项目计划未声明实体关系，按无关系处理。

## 六、验收标准

- 待补充实体验收标准

## 七、风险与待确认事项

- 暂无明确风险
