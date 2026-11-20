/**
 * 门禁卡契约业务接口
 */

import service from './service';

/** 权限状态取值 */
export type AccessCardPermissionStatus = '使用中' | '已注销';

/** 申请注销取值，发起离职注销后为「离职」 */
export type AccessCardCancellationApplication = '离职';

/** 门禁卡信息，包含姓名、员工编号、卡号与权限状态 */
export interface AccessCard {
  /** 门禁卡记录唯一标识 */
  id: string;
  /** 持卡员工的姓名，例如「张三」 */
  name: string;
  /** 持卡员工的员工编号，例如「12345678」 */
  employeeNo: string;
  /** 门禁卡卡号，例如「8888888」 */
  cardNo: string;
  /** 门禁卡当前的权限状态，仅「使用中」与「已注销」两种取值 */
  permissionStatus: AccessCardPermissionStatus;
  /** 门禁卡的注销申请状态，发起离职注销后为「离职」 */
  cancellationApplication?: AccessCardCancellationApplication;
}

/** 本人使用中门禁卡分页结果 */
export interface AccessCardPageResponse {
  /** 记录总数 */
  total: number;
  /** 每页记录数 */
  pageSize: number;
  /** 当前页码，从 1 开始 */
  current: number;
  /** 当前页门禁卡列表 */
  list: AccessCard[];
}

/** 获取本人使用中门禁卡列表的查询参数 */
export interface ListAccessCardsParams {
  /** 当前页码，从 1 开始，最小为 1 */
  current: number;
  /** 每页记录数，最小为 1 */
  pageSize: number;
}

/** 默认分页参数 */
export const DEFAULT_ACCESS_CARD_PAGE_PARAMS: ListAccessCardsParams = {
  current: 1,
  pageSize: 10,
};

/**
 * 获取本人使用中门禁卡列表
 *
 * GET /api/access-cards
 * 支持分页，未传分页参数时使用默认值 current=1、pageSize=10。
 * UNAUTHORIZED 错误码由调用方处理。
 */
export function listAccessCards(
  params: Partial<ListAccessCardsParams> = {},
): Promise<AccessCardPageResponse> {
  const current = params.current ?? DEFAULT_ACCESS_CARD_PAGE_PARAMS.current;
  const pageSize = params.pageSize ?? DEFAULT_ACCESS_CARD_PAGE_PARAMS.pageSize;

  return service.get<AccessCardPageResponse>('/api/access-cards', {
    params: {
      current,
      pageSize,
    },
  });
}

/** 发起离职注销申请的请求体，需携带使用中门禁卡列表中的记录 id */
export interface CancelAccessCardRequest {
  /** 需要发起离职注销的门禁卡记录标识，来源于使用中门禁卡列表中的记录 id */
  accessCardId: string;
}

/**
 * 发起离职注销申请
 *
 * PATCH /api/access-cards/cancellation
 * 将对应卡片的申请注销字段更新为「离职」，返回更新后的门禁卡信息。
 * 统一复用平台 service 客户端，后端统一响应封装中的 NOT_FOUND、INVALID_STATE
 * 错误原样透传给调用方，由页面负责提示，不在此处吞错降级。
 */
export async function applyCancellation(
  payload: CancelAccessCardRequest,
): Promise<AccessCard> {
  // 平台 service 仅封装 get/post/put/delete，未提供 patch 方法，
  // 此处通过其 post 方法传入 method: 'PATCH' 覆盖请求方法，
  // 从而复用同一 axios 实例的拦截器、超时与统一响应处理。
  return service.post<AccessCard>(
    '/api/access-cards/cancellation',
    { accessCardId: payload.accessCardId },
    { method: 'PATCH' },
  );
}

/** 门禁卡契约接口聚合对象，便于页面按需引用 */
const accessCardContractApi = {
  listAccessCards,
  applyCancellation,
};

export default accessCardContractApi;
