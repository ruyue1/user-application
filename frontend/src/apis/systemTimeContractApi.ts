/**
 * 后端系统时间契约（system_time_contract）业务访问模块。
 *
 * 复用平台提供的 src/apis/service.ts HTTP 客户端：
 * 响应拦截器负责校验后端统一响应并处理业务返回码，
 * 成功时直接返回业务 body（即 SystemTimeResponse），
 * 失败（含 INTERNAL_ERROR 等业务错误码与网络异常）由统一请求层抛出，
 * 本模块不做异常捕获与页面展示逻辑。
 */

import service from './service';

/** 后端系统当前时间响应（对应 API Contract schema: SystemTimeResponse）。 */
export interface SystemTimeResponse {
  /** 后端系统在响应请求时返回的当前时间，精确到秒（date-time 字符串）。 */
  currentTime: string;
}

/** 获取后端系统当前时间：GET /api/system-time/current */
export function getCurrentTime(): Promise<SystemTimeResponse> {
  return service.get<SystemTimeResponse>('/api/system-time/current');
}

export default getCurrentTime;
