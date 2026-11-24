import service from './service';

/** 获取问候语接口的响应数据。 */
export interface GreetingResult {
  /** 问候字符串，页面居中展示该内容 */
  message: string;
}

/** 获取问候语，返回固定问候字符串（如「晚上好！」），供问候展示页加载后居中展示。 */
export function getGreeting(): Promise<GreetingResult> {
  return service.get<GreetingResult>('/greeting');
}
