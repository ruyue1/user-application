/**
 * 服务器时间业务接口
 *
 * API Contract: server_time_contract
 * 端点: server_time_contract.read_server_time — GET /api/server-time（无请求参数、无需鉴权）
 */

import service from './service';

/** 服务器当前时间响应（server_time_contract.schemas.ServerTimeResponse） */
export interface ServerTimeResponse {
  /** 后端服务器返回的当前时间，用于页面展示并确认前后端连通性。 */
  currentTime: string;
}

/**
 * 读取后端服务器当前时间。
 *
 * 错误码 INTERNAL_ERROR 由平台统一请求层（service.ts）处理，本模块不重复封装。
 */
export async function readServerTime(): Promise<ServerTimeResponse> {
  return service.get<ServerTimeResponse>('/api/server-time');
}

export default readServerTime;
