import service from './service';

/** 提交年龄请求体，字段与 API 契约 AgeSubmitInput 一致。 */
export interface AgeSubmitInput {
  age_value: number;
}

/** 提交年龄响应体，字段与 API 契约 AgeSubmitOutput 一致。 */
export interface AgeSubmitOutput {
  recordId: number;
  savedAgeValue: number;
  message: string;
}

/** 年龄录入端点路径，对应契约 age_entry_api.submit（POST /api/age-entry）。 */
const AGE_ENTRY_SUBMIT_URL = '/api/age-entry';

/**
 * 提交年龄。
 *
 * 后端负责校验并持久化年龄数值，错误码 INVALID_AGE / INTERNAL_ERROR 由统一响应结构透传，
 * 本模块不做本地兜底业务逻辑，也不提供任何年龄列表/查询能力。
 */
export async function submitAgeEntry(payload: AgeSubmitInput): Promise<AgeSubmitOutput> {
  return service.post<AgeSubmitOutput>(AGE_ENTRY_SUBMIT_URL, payload);
}
