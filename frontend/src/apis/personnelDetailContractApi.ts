import service from './service';

/** 人员性别枚举 */
export type PersonnelGender = '男' | '女' | '未知';

/** 人员明细列表项 */
export interface PersonnelDetailListItem {
  /** 姓名（唯一标识） */
  name?: string;
  /** 性别 */
  gender?: PersonnelGender;
  /** 年龄 */
  age?: number;
  /** 电子邮箱 */
  email?: string;
  /** 所属部门 */
  department?: string;
  /** 职位 */
  position?: string;
  /** 入职日期 */
  entryDate?: string;
  /** 备注 */
  remark?: string;
}

/** 分页查询参数 */
export interface PersonnelDetailListParams {
  /** 当前页码，从 1 开始 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
}

/** 分页返回结构 */
export interface PageResult<T> {
  /** 总条数 */
  total?: number;
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 列表数据 */
  list?: T[];
}

/** 分页查询人员明细列表 */
export function listPersonnelDetails(
  params: PersonnelDetailListParams = {},
): Promise<PageResult<PersonnelDetailListItem>> {
  return service.get<PageResult<PersonnelDetailListItem>>('/personnel-details', { params });
}
