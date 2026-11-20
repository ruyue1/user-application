/**
 * 门禁卡申请明细契约业务接口
 */

import axios, { type AxiosResponse } from 'axios';

import service from './service';

/** 领签状态取值 */
export type AccessCardClaimStatus = '待领签' | '已领签';

/** 门禁卡申请明细，包含姓名、员工编号、卡号与领签状态 */
export interface AccessCardApplication {
  /** 申请明细的唯一标识 */
  id: string;
  /** 员工姓名，例如「张三」 */
  name: string;
  /** 员工工号，例如「12345678」 */
  employeeNo: string;
  /** 门禁卡卡号，例如「8888888」 */
  cardNo: string;
  /** 领签状态，仅「待领签」与「已领签」两种取值 */
  claimStatus: AccessCardClaimStatus;
}

/** 本人待领签门禁卡申请明细分页结果 */
export interface AccessCardApplicationPage {
  /** 匹配的申请明细总数 */
  total: number;
  /** 每页记录数 */
  pageSize: number;
  /** 当前页码，从 1 开始 */
  current: number;
  /** 当前页的待领签申请明细列表 */
  list: AccessCardApplication[];
}

/** 获取本人待领签申请明细的查询参数 */
export interface ListAccessCardApplicationsParams {
  /** 招乎扫码识别出的扫码人ID，用于匹配领签人字段筛选本人名下明细 */
  claimerId: string;
  /** 当前页码，从 1 开始，最小为 1 */
  current: number;
  /** 每页记录数，最小为 1 */
  pageSize: number;
}

/**
 * 获取本人待领签申请明细
 *
 * GET /api/access-card-applications
 * 参数错误时后端返回 INVALID_PARAMETER 错误码，由调用方处理。
 */
export function listAccessCardApplications(
  params: ListAccessCardApplicationsParams,
): Promise<AccessCardApplicationPage> {
  return service.get<AccessCardApplicationPage>('/api/access-card-applications', {
    params: {
      claimerId: params.claimerId,
      current: params.current,
      pageSize: params.pageSize,
    },
  });
}

/** 完成领签请求，选中待领签申请明细的内部记录 id 集合 */
export interface CompleteClaimRequest {
  /** 已勾选待领签申请明细的记录 id 列表，至少一条 */
  ids: string[];
}

/** 完成领签后返回更新后的申请明细 */
export interface CompleteClaimResponse {
  /** 本次更新为「已领签」的明细条数 */
  updatedCount: number;
  /** 更新后的申请明细列表 */
  list: AccessCardApplication[];
}

/**
 * 完成领签
 *
 * PATCH /api/access-card-applications/claim
 * 将已勾选申请明细的领签状态由「待领签」更新为「已领签」。
 * 参数错误、明细不存在、状态非法时后端分别返回
 * INVALID_PARAMETER、NOT_FOUND、INVALID_STATE 错误码，由调用方处理。
 */
export function completeClaim(payload: CompleteClaimRequest): Promise<CompleteClaimResponse> {
  // 平台提供的 service 只封装了 get/post/put/delete，未暴露 patch，
  // 且 service.ts 属于禁止修改的框架文件；此处使用工程已有的 axios 实例发起
  // PATCH 请求，请求地址、方法与契约保持一致，非 2xx 响应由调用方通过异常捕获处理。
  return axios
    .patch<CompleteClaimResponse>('/api/access-card-applications/claim', {
      ids: payload.ids,
    } satisfies CompleteClaimRequest)
    .then((response: AxiosResponse<CompleteClaimResponse>) => response.data);
}

/** 门禁卡申请明细契约接口聚合对象，便于页面按需引用 */
const accessCardApplicationContractApi = {
  listAccessCardApplications,
  completeClaim,
};

export default accessCardApplicationContractApi;
