/**
 * 门禁卡领用申请 业务接口定义
 *
 * 对应 API Contract：contract_access_card_claim_application
 * - GET /api/access-card-claim-applications （查询本人待领签申请明细）
 * - POST /api/access-card-claim-applications/complete-claim （完成领签）
 */

import service from './service';

/** 领签状态取值 */
export type ClaimStatus = '待领签' | '已领签';

/** 门禁卡领用申请明细，用于领用页表格展示 */
export interface AccessCardClaimApplicationItem {
  /** 申请明细记录标识 */
  id: string;
  /** 员工姓名 */
  employeeName: string;
  /** 员工编号 */
  employeeNo: string;
  /** 门禁卡卡号 */
  cardNo: string;
  /** 领签状态 */
  claimStatus: ClaimStatus;
}

/** 待领签申请明细分页结果 */
export interface AccessCardClaimApplicationPage {
  /** 总记录数 */
  total: number;
  /** 每页条数 */
  pageSize: number;
  /** 当前页码 */
  current: number;
  /** 当前页申请明细列表 */
  list: AccessCardClaimApplicationItem[];
}

/** 查询本人待领签申请明细的请求参数 */
export interface AccessCardClaimApplicationListParams {
  /** 当前页码，最小为 1 */
  current: number;
  /** 每页条数，最小为 1 */
  pageSize: number;
}

/** 完成领签请求：提交勾选或全选的申请明细 */
export interface CompleteClaimRequest {
  /** 需要完成领签的申请明细标识列表，来源于明细列表返回的 id */
  applicationIds: string[];
}

/** 完成领签结果 */
export interface CompleteClaimResult {
  /** 本次更新为已领签的申请明细条数 */
  updatedCount: number;
  /** 本次完成领签的申请明细标识列表 */
  applicationIds: string[];
}

/**
 * 查询本人待领签的门禁卡领用申请明细分页列表
 *
 * 契约命名导出：listAccessCardClaimApplications
 * GET /api/access-card-claim-applications
 *
 * @param params 分页参数（current、pageSize 均必填）
 * @returns 申请明细分页结果
 */
export async function listAccessCardClaimApplications(
  params: AccessCardClaimApplicationListParams,
): Promise<AccessCardClaimApplicationPage> {
  const { current, pageSize } = params;
  return service.get<AccessCardClaimApplicationPage>(
    '/api/access-card-claim-applications',
    { params: { current, pageSize } },
  );
}

/** 兼容别名：语义与 listAccessCardClaimApplications 完全一致 */
export const fetchAccessCardClaimApplicationList = listAccessCardClaimApplications;

/** 兼容别名：语义与 listAccessCardClaimApplications 完全一致 */
export const listClaimApplications = listAccessCardClaimApplications;

/**
 * 将勾选或全选的申请明细领签状态由待领签更新为已领签
 *
 * @param payload 完成领签请求，applicationIds 至少包含一项
 * @returns 完成领签结果（更新条数与申请明细标识列表）
 */
export async function completeClaim(
  payload: CompleteClaimRequest,
): Promise<CompleteClaimResult> {
  return service.post<CompleteClaimResult>(
    '/api/access-card-claim-applications/complete-claim',
    { applicationIds: payload.applicationIds },
  );
}

export default fetchAccessCardClaimApplicationList;
