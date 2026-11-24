# Endpoint 字段映射：GET /api/personnel

- API Contract：`personnel_contract`
- Endpoint：`personnel_contract.listPersonnel`
- 数据库操作：`read`
- 状态：已确认
<!-- devagentstudio-artifact-revision: c7df989b8482470299b48737aa7743c8 -->

## 接口映射说明

> 分页读取人员明细记录，供只读列表集中浏览人员信息，支持分页参数 current 和 pageSize。返回字段直接映射人员明细，无查询筛选条件；总数、页码和每页条数缺失时报错。

## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- response.response_body.total ← 业务规则：符合条件的人员明细记录总数；依赖：无；缺值时：报错
- response.response_body.current ← 业务规则：实际页码；依赖：无；缺值时：报错
- response.response_body.pageSize ← 业务规则：实际每页条数；依赖：无；缺值时：报错
- 直接映射 → ds-60b5caff714044e9.personnel.id → response.response_body.list[].id
- 直接映射 → ds-60b5caff714044e9.personnel.name → response.response_body.list[].name
- 直接映射 → ds-60b5caff714044e9.personnel.gender → response.response_body.list[].gender
- 直接映射 → ds-60b5caff714044e9.personnel.birth_date → response.response_body.list[].birthDate
- 直接映射 → ds-60b5caff714044e9.personnel.email → response.response_body.list[].email
- 直接映射 → ds-60b5caff714044e9.personnel.department → response.response_body.list[].department
- 直接映射 → ds-60b5caff714044e9.personnel.position → response.response_body.list[].position
- 直接映射 → ds-60b5caff714044e9.personnel.hire_date → response.response_body.list[].hireDate
- 直接映射 → ds-60b5caff714044e9.personnel.remark → response.response_body.list[].remark

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

### studio `ds-60b5caff714044e9`（database）
- 映射字段：personnel.id、personnel.name、personnel.gender、personnel.birth_date、personnel.email、personnel.department、personnel.position、personnel.hire_date、personnel.remark
