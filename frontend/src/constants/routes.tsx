import type { PageRouteDefinition } from '@/typings/routes';

export const PAGE_ROUTE = 'page';
export const PAGE_ROUTES: PageRouteDefinition[] = [
  { name: '欢迎页', pageId: 'welcome' },
  // DEVAGENTSTUDIO_BUSINESS_ROUTES_START
  {
    name: "年龄录入",
    pageId: "age_entry_home",
  },
  // DEVAGENTSTUDIO_BUSINESS_ROUTES_END
];
