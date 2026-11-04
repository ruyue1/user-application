import type { PageRouteDefinition } from '@/typings/routes';

/** 业务路由根路径；业务页面 URL 始终以 /page 开头。 */
export const PAGE_ROUTE = 'page';

/**
 * 页面路由、路由权限与菜单入口的唯一配置来源。
 * 后续业务页面请在 DEVAGENTSTUDIO_BUSINESS_ROUTES 标记之间追加配置。
 * 仅当平台 authorization_manifest 明确绑定页面资源时，才添加 resourceKey。
 * 未声明 resourceKey 的页面不参与前端业务权限控制，也不得自动补充资源点。
 */
export const PAGE_ROUTES: PageRouteDefinition[] = [
  {
    path: 'home',
    label: '首页',
  },
  // DEVAGENTSTUDIO_BUSINESS_ROUTES_START
  {
    path: "hello_world",
    label: "Hello World 展示页",
  },
  {
    path: "hello_agent",
    label: "Hello Agent 展示页",
  },
  {
    path: "welcome_to_my_world",
    label: "欢迎来到我的世界展示页",
  },
  {
    path: "good_morning",
    label: "早上好展示页",
  },
  // DEVAGENTSTUDIO_BUSINESS_ROUTES_END
];
