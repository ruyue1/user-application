# 技术规划

- 状态：已确认
- 类型：technical-plan

## 技术架构

- 前端：React 单页管理客户端采用 PC 端侧边栏导航布局，页头启用、页脚禁用，通过 REST 接口与后端交换 JSON 数据。
- 后端：后端技术栈固定为 Java8 + Springboot，提供真实 HTTP API、资源接口和业务契约实现。
- 数据：数据库固定使用 MySQL8，缓存固定使用 Redis。

## 业务实体

### 商品 (`Product`)

记录商品的基础信息，包括名称、编码、分类、状态和说明等。

| 字段名 | 展示名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `product_id` | 商品ID | text | 是 | 商品的唯一标识。 |
| `product_name` | 商品名称 | text | 是 | 商品的名称，用于搜索和列表展示。 |
| `product_code` | 商品编码 | text | 是 | 商品的唯一编码，用于业务识别。 |
| `category` | 所属分类 | text | 是 | 商品所属的分类名称。 |
| `status` | 商品状态 | enum | 是 | 商品的上下架状态。 |
| `description` | 商品说明 | long_text | 否 | 商品的详细说明文本。 |
| `created_at` | 创建时间 | datetime | 是 | 商品记录的创建时间。 |
| `updated_at` | 更新时间 | datetime | 是 | 商品记录的最近更新时间。 |

## API 契约

### `/api/products` product_api

#### 字段 Schema

- `ProductListItem`：`productId` string 必填；`productName` string 必填；`productCode` string 必填；`category` string 必填；`status` string 必填；`createdAt` string 必填；`updatedAt` string 必填
- `ProductListOutput`：`total` integer 必填；`pageSize` integer 必填；`current` integer 必填；`list` array 必填
- `ProductDetailOutput`：`productId` string 必填；`productName` string 必填；`productCode` string 必填；`category` string 必填；`status` string 必填；`description` string 必填；`createdAt` string 必填；`updatedAt` string 必填
- `ProductCreateInput`：`productName` string 必填；`productCode` string 必填；`category` string 必填；`status` string 必填；`description` string
- `ProductCreateOutput`：`productId` string 必填；`productName` string 必填；`productCode` string 必填；`category` string 必填；`status` string 必填；`description` string；`createdAt` string 必填；`updatedAt` string 必填

#### Endpoint

- `product_api.list` · `GET /api/products`：按分页条件、商品名称关键词、分类和状态筛选查询商品列表。
  - 参数：`current` query/integer/可选、`pageSize` query/integer/可选、`keyword` query/string/可选、`category` query/string/可选、`status` query/string/可选
  - 请求 Schema：无
  - 响应 Schema：ProductListOutput
  - 错误码：`INTERNAL_ERROR`
- `product_api.detail` · `GET /api/products/{productId}`：根据商品ID查询商品的完整详细信息。
  - 参数：`productId` path/string/必填
  - 请求 Schema：无
  - 响应 Schema：ProductDetailOutput
  - 错误码：`NOT_FOUND`、`INTERNAL_ERROR`
- `product_api.create` · `POST /api/products`：提交商品信息创建新商品，返回创建后的商品完整信息。
  - 参数：无
  - 请求 Schema：ProductCreateInput
  - 响应 Schema：ProductCreateOutput
  - 错误码：`VALIDATION_ERROR`、`INTERNAL_ERROR`

## 页面技术引用

### `product_list`

Endpoint 依赖：
  - `product_api.list`：page_load；触发=进入商品列表页或提交搜索、分类筛选、状态筛选条件时；首屏必需=True
  - `product_api.detail`：action_trigger；触发=点击列表中的商品查看详情时；首屏必需=False

业务 Action 实现：
  - `search_product`：{"endpointId": "product_api.list"}
  - `filter_by_category`：{"endpointId": "product_api.list"}
  - `filter_by_status`：{"endpointId": "product_api.list"}

### `product_create`

Endpoint 依赖：
  - `product_api.create`：action_trigger；触发=点击提交按钮提交商品新增表单时；首屏必需=False

业务 Action 实现：
  - `submit_product_form`：{"endpointId": "product_api.create"}

## 接口权限绑定（系统编译，只读）

- 角色、页面/操作资源及默认授权已在需求阶段确认；调整授权请返回需求阶段重新确认。
- 本阶段按业务操作调用的接口生成权限绑定，页面权限与接口权限独立。
- Manifest：`authorization-manifest.v3`
- 指纹：`sha256:322b4621177476bce45b77aeec3acf6bf4bb9ae05e952dcb8e69b82efbb03adc`

Endpoint 操作资源绑定：
| Endpoint | 操作资源 | 裁决 |
| --- | --- | --- |
| 无 | - | - |
