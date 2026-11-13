/**
 * 问候语业务接口定义
 * API Contract: greeting (base_path: /api/hi)
 */

import service from "./service";

/** GET /api/hi 的响应业务类型 */
export interface GreetingResponse {
  /** 问候语内容，固定为"欢迎来到我的世界！" */
  content: string;
}

/**
 * 获取问候语
 * GET /api/hi
 * 无请求参数，返回问候语内容。
 */
export async function getGreeting(): Promise<GreetingResponse> {
  return service.get<GreetingResponse>("/api/hi");
}

export default getGreeting;
