import service from './service';

export interface GreetingMessageResponse {
  greetingText: string;
}

/**
 * 获取晚间问候语
 * @endpoint greeting_message_contract.get_good_evening
 */
export async function getGoodEvening(): Promise<GreetingMessageResponse> {
  return service.get<GreetingMessageResponse>('/api/greetings/good-evening');
}

/**
 * 获取欢迎世界问候语
 * @endpoint greeting_message_contract.get_welcome_world
 */
export async function getWelcomeWorld(): Promise<GreetingMessageResponse> {
  return service.get<GreetingMessageResponse>('/api/greetings/welcome-world');
}
