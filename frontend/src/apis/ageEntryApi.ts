import service from './service';

/** 年龄录入接口契约标识与路径（与 api_contracts.age_entry_api 保持一致）。 */
export const AGE_ENTRY_API_BASE_PATH = '/api/age-entry';

/** 契约声明的业务错误码。 */
export const AGE_ENTRY_ERROR_CODES = {
  /** 年龄校验失败（例如非整数、超出有效范围）。 */
  validation: 'VALIDATION_ERROR',
  /** 服务端内部错误。 */
  internal: 'INTERNAL_ERROR',
} as const;

/**
 * age_entry_api.create 请求体（AgeEntryCreateInput）。
 * age：待保存的年龄值，必填，整数。
 */
export interface AgeEntryCreateInput {
  /** The age value to be saved. */
  age: number;
}

/**
 * age_entry_api.create 响应体（AgeEntryCreateOutput）。
 */
export interface AgeEntryCreateOutput {
  /** Unique identifier of the created age entry record. */
  id: number;
  /** The saved age value. */
  age: number;
  /** Timestamp when the age entry was saved. */
  createdAt: string;
  /** User-facing result message. */
  message: string;
}

/**
 * 提交年龄录入。
 * POST /api/age-entry
 *
 * 复用平台自有 HTTP 客户端 frontend/src/apis/service.ts：成功时 service 已完成
 * 响应信封校验并返回业务 body（AgeEntryCreateOutput）。当后端返回
 * VALIDATION_ERROR / INTERNAL_ERROR 时，service 会抛出携带 returnCode 的
 * ServiceResponseError，这里不做吞没，原样向调用方（页面 useRequest）抛出，
 * 由页面展示对应校验/错误提示。
 */
export async function createAgeEntry(payload: AgeEntryCreateInput): Promise<AgeEntryCreateOutput> {
  return service.post<AgeEntryCreateOutput>(AGE_ENTRY_API_BASE_PATH, payload);
}
