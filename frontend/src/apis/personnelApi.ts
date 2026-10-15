import service from './service';

/**
 * personnel_api.list — 查询人员明细列表 (GET /api/personnel)
 * 查询参数：current（页码，默认 1）、pageSize（分页大小，默认 20）、keyword（关键字），均为可选。
 */
export interface PersonnelListParams {
  /** 页码，默认 1 */
  current?: number;
  /** 分页大小，默认 20 */
  pageSize?: number;
  /** 模糊查询关键字 */
  keyword?: string;
}

/** 人员明细列表项（PersonnelListItem） */
export interface PersonnelListItem {
  /** 人员编号 */
  personnelId: string;
  /** 人员姓名 */
  name: string;
  /** 人员性别 */
  gender: string;
  /** 所属部门 */
  department: string;
  /** 岗位 */
  position?: string;
  /** 联系电话 */
  phone?: string;
  /** 邮箱 */
  email?: string;
  /** 入职日期 */
  hireDate?: string;
  /** 在职状态 */
  status: string;
  /** 创建时间 */
  createdAt?: string;
}

/** 人员明细列表响应（PersonnelListOutput） */
export interface PersonnelListOutput {
  /** 总记录数 */
  total: number;
  /** 分页大小 */
  pageSize: number;
  /** 当前页码 */
  current: number;
  /** 人员明细列表 */
  list: PersonnelListItem[];
}

/**
 * 查询人员明细列表（分页）
 */
export async function fetchPersonnelList(
  params: PersonnelListParams = {},
): Promise<PersonnelListOutput> {
  const { current = 1, pageSize = 20, keyword } = params;
  return service.get<PersonnelListOutput>('/api/personnel', {
    params: { current, pageSize, keyword },
  });
}
