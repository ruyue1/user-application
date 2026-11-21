import service from './service';

export interface MorningGreetingResponse {
  morningGreetingText: string;
}

export async function getMorningGreeting(): Promise<MorningGreetingResponse> {
  return service.get<MorningGreetingResponse>('/api/greetings/morning');
}
