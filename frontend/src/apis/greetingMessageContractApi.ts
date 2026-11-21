import service from './service';

export interface GreetingMessageResponse {
  greetingText: string;
}

/**
 * 获取欢迎世界问候语
 * @endpoint greeting_message_contract.get_welcome_world
 */
export async function getWelcomeWorld(): Promise<GreetingMessageResponse> {
  return service.get<GreetingMessageResponse>('/api/greetings/welcome-world');
}
