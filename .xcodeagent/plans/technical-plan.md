# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：A React single-page application uses a PC side-navigation layout with a header (no footer). The home page displays survey introduction content fetched from the backend. The survey form page provides a multi-section questionnaire with client-side required-field validation; on submission failure the form retains entered values for re-submission. Communication with the backend is through REST JSON APIs.
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### 调查问卷提交 (`SurveySubmission`)

学生提交的职业发展规划调查问卷记录，包含个人基本信息、职业目标、自我能力评估与发展规划等内容。

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `student_name` | 姓名 | text | 是 | 学生的姓名 |
| `student_id` | 学号 | text | 是 | 学生的学号 |
| `major` | 专业 | text | 是 | 学生所学专业 |
| `grade` | 年级 | enum | 是 | 学生所在年级 |
| `career_direction` | 期望职业方向 | text | 是 | 学生期望的职业发展方向 |
| `target_industry` | 目标行业 | text | 是 | 学生希望进入的目标行业 |
| `target_position` | 目标岗位 | text | 是 | 学生期望的目标岗位 |
| `professional_skills` | 专业技能 | long_text | 是 | 学生对自身专业技能的评估 |
| `soft_skills` | 软实力 | long_text | 是 | 学生对自身软实力的评估 |
| `interests` | 兴趣特长 | long_text | 是 | 学生的兴趣与特长 |
| `in_school_plan` | 在校期间发展计划 | long_text | 是 | 学生在校期间的职业发展行动计划 |
| `post_graduation_plan` | 毕业后发展计划 | long_text | 是 | 学生毕业后的职业发展行动计划 |
| `timeline` | 时间安排 | long_text | 是 | 学生职业发展的时间安排 |
| `submitted_at` | 提交时间 | datetime | 是 | 问卷提交的时间戳 |

## API 契约

### `/api/survey` survey_api

#### 字段 Schema

- `SurveyInfoOutput`：`title` string 必填；`purpose` string 必填；`entryGuide` string 必填
- `SurveySubmissionInput`：`studentName` string 必填；`studentId` string 必填；`major` string 必填；`grade` string 必填；`careerDirection` string 必填；`targetIndustry` string 必填；`targetPosition` string 必填；`professionalSkills` string 必填；`softSkills` string 必填；`interests` string 必填；`inSchoolPlan` string 必填；`postGraduationPlan` string 必填；`timeline` string 必填
- `SurveySubmissionOutput`：`submissionId` string 必填；`submittedAt` string 必填；`message` string 必填

#### Endpoint

- `survey_api.get_info` · `GET /api/survey/info`：获取调查问卷的标题、目的与填写入口指引信息，用于首页展示
  - 参数：无
  - 请求 Schema：无
  - 响应 Schema：SurveyInfoOutput
  - 错误码：`UNAUTHORIZED`、`INTERNAL_ERROR`
- `survey_api.submit` · `POST /api/survey/submissions`：提交学生填写的职业发展规划调查问卷，服务端校验必填字段后持久化并返回成功反馈
  - 参数：无
  - 请求 Schema：SurveySubmissionInput
  - 响应 Schema：SurveySubmissionOutput
  - 错误码：`UNAUTHORIZED`、`VALIDATION_ERROR`、`INTERNAL_ERROR`

## 页面技术引用

### `home`

Endpoint 依赖：
  - `survey_api.get_info`：page_load；触发=学生进入首页时加载问卷标题、目的与入口指引信息；首屏必需=True

业务 Action 实现：
  - 无

### `survey_form`

Endpoint 依赖：
  - `survey_api.submit`：form_submission；触发=学生确认填写内容后点击提交问卷按钮；首屏必需=False

业务 Action 实现：
  - `submit_survey`：{"endpointId": "survey_api.submit"}

## 权限资源目录（系统编译，只读）

- 未启用运行态权限管理。
