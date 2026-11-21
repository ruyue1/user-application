/**
 * 离职注销申请 业务接口定义
 *
 * 对应 API Contract：contract_deactivation_submission
 * - GET  /api/deactivation-submissions （查询本人使用中门禁卡，用于门禁卡归还页表格展示）
 * - POST /api/deactivation-submissions （提交离职注销申请，返回提交结果用于已完成界面展示）
 *
 * 说明：统一复用平台提供的 service.ts 发起 HTTP 请求，不在此处吞掉后端业务错误，
 * 后端错误码 INVALID_PARAMETER / NOT_FOUND / INVALID_STATE 由 service 的响应拦截器统一传递。
 */

import service from './service';

/** 门禁卡权限状态取值 */
export type AccessCardPermissionStatus = '使用中';

/** 申请注销状态取值 */
export type DeactivationApplyStatus = '离职';

/** 同步状态取值 */
export type DeactivationSyncStatus = '已同步' | '同步失败';

/** 注销流程状态取值 */
export type DeactivationProcessStatus = '已发起' | '处理中' | '已完成';

/** 本人名下使用中的门禁卡记录，用于归还页表格只读展示 */
export interface AccessCardItem {
  /** 门禁卡主键，发起离职注销申请时指定卡片 */
  id: string;
  /** 姓名 */
  employeeName: string;
  /** 员工编号 */
  employeeNo: string;
  /** 卡号 */
  cardNo: string;
  /** 权限状态 */
  permissionStatus: AccessCardPermissionStatus;
}

/** 本人使用中门禁卡分页结果 */
export interface AccessCardPage {
  /** 记录总数 */
  total: number;
  /** 每页条数 */
  pageSize: number;
  /** 当前页码 */
  current: number;
  /** 门禁卡列表 */
  list: AccessCardItem[];
}

/** 查询本人使用中门禁卡的请求参数 */
export interface AccessCardPageQuery {
  /** 当前页码，最小为 1 */
  current: number;
  /** 每页条数，最小为 1 */
  pageSize: number;
}

/** 提交离职注销申请的请求体，指明本人名下使用中的门禁卡 */
export interface DeactivationSubmissionRequest {
  /** 发起离职注销申请所对应的门禁卡主键（查询本人使用中门禁卡列表返回的 id） */
  cardId: string;
}

/** 离职注销申请提交结果详情 */
export interface DeactivationSubmissionResult {
  /** 提交结果主键 */
  id: string;
  /** 本次申请注销的门禁卡主键 */
  cardId: string;
  /** 姓名 */
  employeeName: string;
  /** 员工编号 */
  employeeNo: string;
  /** 卡号 */
  cardNo: string;
  /** 申请注销状态 */
  deactivationApply: DeactivationApplyStatus;
  /** 同步状态 */
  syncStatus: DeactivationSyncStatus;
  /** 注销流程状态 */
  processStatus: DeactivationProcessStatus;
  /** 提交时间（date-time） */
  submittedAt: string;
}

/**
 * 查询本人名下权限状态为使用中的门禁卡分页列表
 *
 * @param query 分页参数（current、pageSize 均必填）
 * @returns 门禁卡分页结果
 */
export async function listDeactivationSubmissions(
  query: AccessCardPageQuery,
): Promise<AccessCardPage> {
  return service.get<AccessCardPage>('/api/deactivation-submissions', {
    params: {
      current: query.current,
      pageSize: query.pageSize,
    },
  });
}

/**
 * 查询本人名下权限状态为使用中的门禁卡分页列表（页面兼容别名）
 *
 * @param params 分页参数（current、pageSize 均必填）
 * @returns 门禁卡分页结果
 */
export async function fetchDeactivationSubmissionAccessCardList(
  params: AccessCardPageQuery,
): Promise<AccessCardPage> {
  return listDeactivationSubmissions(params);
}

/**
 * 查询本人名下权限状态为使用中的门禁卡分页列表（任务声明入口）
 *
 * 用于门禁卡归还页面 ProTable 的 request 数据加载，参数与返回结构同 API Contract
 * contract_deactivation_submission.list。
 *
 * @param params 分页参数（current、pageSize 均必填，均为不小于 1 的整数）
 * @returns 门禁卡分页结果
 */
export async function listDeactivationSubmissionCards(
  params: AccessCardPageQuery,
): Promise<AccessCardPage> {
  return listDeactivationSubmissions(params);
}

/**
 * 对本人名下使用中的门禁卡发起离职注销申请
 *
 * @param body 离职注销申请请求体，cardId 为门禁卡主键
 * @returns 离职注销申请提交结果
 */
export async function submitDeactivation(
  body: DeactivationSubmissionRequest,
): Promise<DeactivationSubmissionResult> {
  return service.post<DeactivationSubmissionResult>('/api/deactivation-submissions', {
    cardId: body.cardId,
  });
}

export default fetchDeactivationSubmissionAccessCardList;
