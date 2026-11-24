# Endpoint 字段映射：GET /personnel-details

- API Contract：`personnel_detail_contract`
- Endpoint：`personnel_detail_contract.listPersonnelDetails`
- 数据库操作：`read`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 5939b0bbe1414ff3b5ccc63db10ec280 -->

## 接口映射说明

> 分页查询人员明细，支持按页码和每页条数浏览。返回总条数、当前页码、每页条数，以及姓名、性别、联系电话、电子邮箱、所属部门、入职日期和备注等明细信息，均直接读取返回；年龄与座机号当前未配置。

## Request 映射

- 无 Request 映射。

## 外部 API 固定参数

- 无外部 API 固定参数。

## 数据库写入字段

- 无数据库写入字段。

## Response 映射

- response.response_body.total ← 业务规则：符合条件的人员明细总数；依赖：无；缺值时：报错
- response.response_body.current ← 业务规则：实际页码；依赖：无；缺值时：报错
- response.response_body.pageSize ← 业务规则：实际每页条数；依赖：无；缺值时：报错
- 直接映射 → ds-0cafd44bf2b1444f.personnel.name → response.response_body.list[].name
- 直接映射 → ds-0cafd44bf2b1444f.personnel.gender → response.response_body.list[].gender
- 直接映射 → ds-0cafd44bf2b1444f.personnel.id → response.response_body.list[].age
- 直接映射 → ds-0cafd44bf2b1444f.personnel.phone → response.response_body.list[].phone
- 直接映射 → ds-0cafd44bf2b1444f.personnel.name → response.response_body.list[].landline
- 直接映射 → ds-0cafd44bf2b1444f.personnel.email → response.response_body.list[].email
- 直接映射 → ds-0cafd44bf2b1444f.personnel.department → response.response_body.list[].department
- 直接映射 → ds-0cafd44bf2b1444f.personnel.hire_date → response.response_body.list[].entryDate
- 直接映射 → ds-0cafd44bf2b1444f.personnel.remark → response.response_body.list[].remark

## 数据库查询条件

- 无数据库查询条件。

## 业务说明

- 无补充业务说明。

## 确认时数据来源

### studio `ds-0cafd44bf2b1444f`（database）
- 映射字段：personnel.id、personnel.name、personnel.gender、personnel.phone、personnel.email、personnel.department、personnel.hire_date、personnel.remark
