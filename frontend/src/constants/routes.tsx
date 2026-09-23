import type { PageRouteDefinition } from '@/typings/routes';

export const PAGE_ROUTE = 'page';
export const PAGE_ROUTES: PageRouteDefinition[] = [
  { name: '欢迎页', pageId: 'welcome' },
  // XCODEAGENT_BUSINESS_ROUTES_START
  {
    name: "欢迎页",
    pageId: "welcome_page",
  },
  {
    name: "Hello Agent 展示页",
    pageId: "hello_agent_page",
  },
  // XCODEAGENT_BUSINESS_ROUTES_END
];
