import type { PageRouteDefinition } from '@/typings/routes';

export const PAGE_ROUTE = 'page';
export const PAGE_ROUTES: PageRouteDefinition[] = [
  { name: '欢迎页', pageId: 'welcome' },
  // XCODEAGENT_BUSINESS_ROUTES_START
  {
    name: "欢迎页",
    pageId: "home",
  },
  {
    name: "Agent 欢迎页",
    pageId: "agent_welcome",
  },
  // XCODEAGENT_BUSINESS_ROUTES_END
];
