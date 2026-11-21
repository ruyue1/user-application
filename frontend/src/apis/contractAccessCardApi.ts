/**
 * 门禁卡业务接口定义
 *
 * 对应 API Contract：contract_access_card
 * - contract_access_card.list —— GET /api/access-cards（查询本人使用中门禁卡）
 * - contract_access_card.apply_deactivation —— POST /api/access-cards/{id}/deactivation-application（申请离职注销）
 *
 * 说明：统一复用平台提供的 service.ts 发起 HTTP 请求，后端错误由 service
 * 的响应拦截器统一传递，业务模块不吞掉错误。
 */

import service from './service';

/** 门禁卡权限状态取值（API Contract 枚举） */
export type AccessCardPermissionStatus = '使用中';

/** 申请注销取值（API Contract 枚举） */
export type AccessCardDeactivationApplication = '离职';

/** 离职注销申请默认请求取值（API Contract 固定枚举） */
export const DEFAULT_DEACTIVATION_APPLICATION: AccessCardDeactivationApplication = '离职';

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

/** 离职注销申请请求体 */
export interface AccessCardDeactivationRequest {
  /** 申请注销取值，固定为离职 */
  deactivationApplication: AccessCardDeactivationApplication;
}

/** 离职注销申请提交结果，返回更新后的门禁卡记录 */
export interface AccessCardDeactivationResponse {
  /** 门禁卡记录唯一标识 */
  id: string;
  /** 门禁卡持有员工姓名 */
  employeeName: string;
  /** 门禁卡持有员工编号 */
  employeeNo: string;
  /** 门禁卡实体卡编号 */
  cardNo: string;
  /** 门禁卡权限状态 */
  permissionStatus: AccessCardPermissionStatus;
  /** 申请注销字段，提交成功后为离职 */
  deactivationApplication: AccessCardDeactivationApplication;
}

/** 默认分页参数（与 API Contract 的 schema default 一致） */
export const DEFAULT_CURRENT = 1;
export const DEFAULT_PAGE_SIZE = 10;

/**
 * 查询本人名下权限状态为使用中的门禁卡分页列表
 * 契约：contract_access_card.list —— GET /api/access-cards
 * @param params 分页参数，均可选，默认 current=1、pageSize=10（最小均为 1）
 */
export async function listAccessCards(
  params: AccessCardListQuery = {},
): Promise<AccessCardPageResponse> {
  const rawCurrent = params?.current ?? DEFAULT_CURRENT;
  const rawPageSize = params?.pageSize ?? DEFAULT_PAGE_SIZE;
  const current = Math.max(1, Math.trunc(rawCurrent));
  const pageSize = Math.max(1, Math.trunc(rawPageSize));
  return service.get<AccessCardPageResponse>('/api/access-cards', {
    params: { current, pageSize },
  });
}

/** 兼容别名：同一契约的列表查询，语义与 listAccessCards 完全一致 */
export const fetchAccessCardList = listAccessCards;

/**
 * 对本人名下使用中的门禁卡发起离职注销申请
 * 契约：contract_access_card.apply_deactivation —— POST /api/access-cards/{id}/deactivation-application
 * @param id 门禁卡记录唯一标识，来源于列表返回的 id
 * @param payload 离职注销申请请求体，可选，默认 { deactivationApplication: '离职' }
 */
export async function applyDeactivation(
  id: string,
  payload: AccessCardDeactivationRequest = {
    deactivationApplication: DEFAULT_DEACTIVATION_APPLICATION,
  },
): Promise<AccessCardDeactivationResponse> {
  const encodedId = encodeURIComponent(String(id));
  const requestBody: AccessCardDeactivationRequest = {
    deactivationApplication:
      payload?.deactivationApplication ?? DEFAULT_DEACTIVATION_APPLICATION,
  };
  return service.post<AccessCardDeactivationResponse>(
    `/api/access-cards/${encodedId}/deactivation-application`,
    requestBody,
  );
}

/** 兼容别名：同一契约的离职注销申请，语义与 applyDeactivation 完全一致 */
export const applyAccessCardDeactivation = applyDeactivation;
