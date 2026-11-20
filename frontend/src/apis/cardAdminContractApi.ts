/**
 * 门禁卡管理员契约业务接口
 */

import service from './service';

/** 门禁卡管理员所属区域取值 */
export type CardAdminRegion = '园区' | 'OCG';

/** 门禁卡管理员信息，按园区或OCG区分 */
export interface CardAdmin {
  /** 门禁卡管理员记录唯一标识 */
  id: string;
  /** 所属区域，取值为「园区」或「OCG」 */
  region: CardAdminRegion;
  /** 管理员姓名，例如「李媛」「徐敏」 */
  adminName: string;
  /** 管理员工号，例如「WS04462」「IT006877」 */
  adminNo: string;
}

/** 门禁卡管理员列表响应 */
export interface CardAdminListResponse {
  /** 门禁卡管理员列表 */
  list: CardAdmin[];
}

/**
 * 获取门禁卡管理员列表
 *
 * GET /api/card-admins
 * 无请求参数；该接口无需鉴权参数。
 */
export function listCardAdmins(): Promise<CardAdminListResponse> {
  return service.get<CardAdminListResponse>('/api/card-admins');
}

/** 门禁卡管理员契约接口聚合对象，便于页面按需引用 */
const cardAdminContractApi = {
  listCardAdmins,
};

export default cardAdminContractApi;
