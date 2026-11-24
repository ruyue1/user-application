import service from './service';

/** 人员性别枚举 */
export type PersonnelGender = '男' | '女';

/** 人员明细列表项 */
export interface PersonnelDetailListItem {
  /** 姓名（唯一业务标识） */
  name: string;
  /** 性别 */
  gender: PersonnelGender;
  /** 年龄，正整数 */
  age: number;
  /** 联系电话 */
  phone: string;
  /** 座机号 */
  landline: string;
  /** 电子邮箱 */
  email: string;
  /** 所属部门 */
  department: string;
  /** 职位 */
  position: string;
  /** 入职日期 */
  entryDate: string;
  /** 备注 */
  remark: string;
}

/** 分页查询人员明细的查询参数 */
export interface PersonnelDetailQuery {
  /** 当前页码，默认 1 */
  current?: number;
  /** 每页条数，默认 20 */
  pageSize?: number;
}

/** 分页查询返回结构 */
export interface PageResult {
  /** 总记录数 */
  total: number;
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 当前页人员明细记录列表 */
  list: PersonnelDetailListItem[];
}

/** 分页查询人员明细列表 */
export async function listPersonnelDetails(params: PersonnelDetailQuery = {}): Promise<PageResult> {
  return service.get<PageResult>('/personnel-details', { params });
}
