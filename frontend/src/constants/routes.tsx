import type { PageRouteDefinition } from '@/typings/routes';

export const PAGE_ROUTE = 'page';
export const PAGE_ROUTES: PageRouteDefinition[] = [
  { name: '欢迎页', pageId: 'welcome' },
  // XCODEAGENT_BUSINESS_ROUTES_START
  {
    name: "Hello World 展示页",
    pageId: "page_home",
  },
  {
    name: "Hello Agent 展示页",
    pageId: "page_hello_agent",
  },
  {
    name: "你好 展示页",
    pageId: "page_hello_greeting",
  },
  // XCODEAGENT_BUSINESS_ROUTES_END
];
