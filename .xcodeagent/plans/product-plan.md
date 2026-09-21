# agent欢迎页产品规划

- 摘要：「agent欢迎页」是一个面向 PC 端的纯展示型应用，本次迭代在原有 Hello World 展示页之外新增一个纯展示页面，居中展示写死的字符串“hello agent!”。两个页面均为静态文案展示，不包含任何后端 API 接口、表单交互或数据读写，也不涉及认证与权限控制。应用沿用 side 导航布局，页头启用、页脚禁用；当前用户确认的业务参与者为访客（匿名浏览者），无需登录即可直接打开导航中的任一展示页面查看内容。
- 状态：confirmed
- 版本：0.1.0

## 页面与用户操作

### Hello World 展示页

- 页面 ID：`page_home`
- 路由：`/page/page/page-home`
- 页面目标：让访客无需登录即可直接看到写死的字符串“hello world”，完成纯展示型应用的浏览目标。
- 页面跳转：无

业务信息：
- `page_home_hello_world_text` Hello World 文案：页面居中展示的写死字符串“hello world”，是访客在本页需要看到的唯一业务信息。

核心操作：
- 无

产品验收标准：
- 访客无需登录即可打开 Hello World 展示页。
- 页面居中展示写死的字符串“hello world”。
- 页面不包含表单、按钮等交互操作入口。
- 页面不发起任何数据请求，也不展示加载、空数据或错误提示。
### Hello Agent 展示页

- 页面 ID：`page_hello_agent`
- 路由：`/page/page/hello-agent`
- 页面目标：让访客无需登录即可通过 side 导航进入本页，直接看到写死的字符串“hello agent!”，完成新增纯展示页面的浏览目标。
- 页面跳转：无

业务信息：
- `page_hello_agent_text` Hello Agent 文案：页面居中展示的写死字符串“hello agent!”，是访客在本页需要看到的唯一业务信息。

核心操作：
- 无

产品验收标准：
- 访客无需登录即可通过 side 导航进入 Hello Agent 展示页。
- 页面居中展示写死的字符串“hello agent!”。
- 页面不包含表单、按钮等交互操作入口。
- 页面不发起任何数据请求，也不展示加载、空数据或错误提示。

## 产品级验收标准

- 访客无需登录即可打开 agent欢迎页 应用并浏览任一展示页面。
- 应用提供 side 导航，访客可在 Hello World 展示页与 Hello Agent 展示页之间切换。
- Hello World 展示页居中展示写死的字符串“hello world”。
- Hello Agent 展示页居中展示写死的字符串“hello agent!”。
- 两个展示页面均不包含表单、交互操作入口或数据读写行为。
- 两个展示页面均不依赖后端接口，打开后直接呈现静态文案。
