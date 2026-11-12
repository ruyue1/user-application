/**
 * 系统时间相关业务接口
 *
 * 对应 API Contract: system_time
 */

import service from './service';

/** 系统时间响应结构：SystemTimeResponse */
export interface SystemTimeResponse {
  /** 后端系统当前时间（ISO date-time 字符串） */
  current_time: string;
}

/**
 * 获取系统时间
 *
 * GET /api/hi
 */
export async function getTime(): Promise<SystemTimeResponse> {
  return service.get<SystemTimeResponse>('/api/hi');
}
