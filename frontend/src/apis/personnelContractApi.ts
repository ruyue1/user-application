import service from './service';

/** 人员性别。 */
export type PersonnelGender = '男' | '女';

/** 人员明细列表项。 */
export interface PersonnelListItem {
  /** 人员记录的整数唯一标识。 */
  id?: number;
  /** 人员的姓名。 */
  name?: string;
  /** 人员的性别。 */
  gender?: PersonnelGender;
  /** 人员的出生日期。 */
  birthDate?: string;
  /** 人员的电子邮箱地址。 */
  email?: string;
  /** 人员所属的部门名称。 */
  department?: string;
  /** 人员在组织中的职位名称。 */
  position?: string;
  /** 人员的入职日期。 */
  hireDate?: string;
  /** 人员的补充说明信息。 */
  remark?: string;
}

/** 分页查询参数。 */
export interface PersonnelListParams {
  /** 当前页码，默认为 1。 */
  current?: number;
  /** 每页记录数，默认为 20。 */
  pageSize?: number;
}

/** 通用分页查询响应结构。 */
export interface PageResult<T> {
  /** 符合条件的记录总数。 */
  total?: number;
  /** 当前页码。 */
  current?: number;
  /** 每页记录数。 */
  pageSize?: number;
  /** 当前页的记录列表。 */
  list?: T[];
}

/** 分页查询人员明细列表，供只读列表集中浏览人员信息。 */
export function fetchPersonnelList(
  params: PersonnelListParams = {},
): Promise<PageResult<PersonnelListItem>> {
  return service.get<PageResult<PersonnelListItem>>('/api/personnel', { params });
}
