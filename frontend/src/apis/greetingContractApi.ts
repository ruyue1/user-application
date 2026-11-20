/**
 * 问候语契约业务接口
 */

import service from './service';

/** 问候语展示响应 */
export interface GreetingResponse {
  /** 接口返回并展示给前端的问候字符串，默认内容为「早上好！」 */
  content: string;
}

/** 获取问候语，无需请求参数，无需鉴权 */
export function getGreeting(): Promise<GreetingResponse> {
  return service.get<GreetingResponse>('/api/greetings');
}

/** 问候语契约接口聚合对象，便于页面按需引用 */
const greetingContractApi = {
  getGreeting,
};

export default greetingContractApi;
