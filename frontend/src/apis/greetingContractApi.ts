import service from './service';

export interface MorningGreetingResponse {
  morningGreetingText: string;
}

export interface NoonGreetingResponse {
  noonGreetingText: string;
}

export async function getMorningGreeting(): Promise<MorningGreetingResponse> {
  return service.get<MorningGreetingResponse>('/api/greetings/morning');
}

export async function getNoonGreeting(): Promise<NoonGreetingResponse> {
  return service.get<NoonGreetingResponse>('/api/greetings/noon');
}
