/**
 * 门禁卡查询接口
 * 契约：contract_access_card.list —— GET /api/access-cards
 *
 * 说明：统一复用平台提供的 service.ts 发起 HTTP 请求，后端错误由 service
 * 的响应拦截器统一传递，业务模块不吞掉错误。
 */

import service from './service';

/** 门禁卡权限状态取值（API Contract 枚举） */
export type AccessCardPermissionStatus = '使用中';

/** 申请注销取值（API Contract 枚举），未发起注销时为空 */
export type AccessCardDeactivationApplication = '离职';

/** 门禁卡列表项，展示本人名下使用中的门禁卡信息 */
export interface AccessCardItem {
  /** 门禁卡记录唯一标识，用于发起离职注销申请时指定卡片 */
  id: string;
  /** 门禁卡持有员工姓名 */
  employeeName: string;
  /** 门禁卡持有员工编号 */
  employeeNo: string;
  /** 门禁卡实体卡编号 */
  cardNo: string;
  /** 门禁卡权限状态，列表中均为使用中 */
  permissionStatus: AccessCardPermissionStatus;
  /** 门禁卡申请注销字段，发起离职注销后为离职，未发起时为空 */
  deactivationApplication?: AccessCardDeactivationApplication | null;
}

/** 本人名下使用中门禁卡分页列表响应 */
export interface AccessCardPageResponse {
  /** 符合条件的门禁卡总数 */
  total: number;
  /** 每页记录数 */
  pageSize: number;
  /** 当前页码 */
  current: number;
  /** 当前页门禁卡记录列表 */
  list: AccessCardItem[];
}

/** 查询本人使用中门禁卡请求参数 */
export interface AccessCardListQuery {
  /** 当前页码，最小为 1，默认 1 */
  current?: number;
  /** 每页记录数，最小为 1，默认 10 */
  pageSize?: number;
}

/** 默认分页参数（与 API Contract 的 schema default 一致） */
const DEFAULT_CURRENT = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * 查询本人名下权限状态为使用中的门禁卡分页列表
 * GET /api/access-cards
 * @param params 分页参数，均可选，默认 current=1、pageSize=10
 */
export async function listAccessCards(
  params: AccessCardListQuery = {},
): Promise<AccessCardPageResponse> {
  const { current = DEFAULT_CURRENT, pageSize = DEFAULT_PAGE_SIZE } = params ?? {};
  return service.get<AccessCardPageResponse>('/api/access-cards', {
    params: { current, pageSize },
  });
}

/** 兼容别名：同一契约的列表查询，语义与 listAccessCards 完全一致 */
export const fetchAccessCardList = listAccessCards;
