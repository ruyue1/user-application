package com.cmbchina.backend.personnel.domain.repository;

import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.personnel.domain.entity.Personnel;

/**
 * 人员明细仓储接口。
 */
public interface PersonnelRepository {

    /**
     * 分页查询全部人员明细，不设筛选条件。
     *
     * @param current  页码，从 1 开始
     * @param pageSize 每页条数
     * @return 人员明细分页结果
     */
    PageResult<Personnel> page(int current, int pageSize);
}
