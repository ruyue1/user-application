# Endpoint 字段映射：POST /api/age-entry

- API Contract：`age_entry_api`
- Endpoint：`age_entry_api.submit`
- 状态：已确认
<!-- devagentstudio-artifact-revision: 1e7f9358a7b340c0ba353b5f743f2500 -->

## API 实现描述

- 未补充 API 实现描述。

## Request 映射

- request.request_body.age_value → application-database.age_record.age → 直接映射

## Response 映射

- response.response_body.recordId：1
- response.response_body.savedAgeValue：1
- response.response_body.message：1

## 业务说明

### response.response_body.recordId
- 业务说明：1
### response.response_body.savedAgeValue
- 业务说明：1
### response.response_body.message
- 业务说明：1

## 确认时数据来源

### 年龄录入数据库 `application-database`（database）
- 映射字段：age_record.age
