package com.cmbchina.backend.domain.repository;

import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.domain.entity.Personnel;

/**
 * 人员明细仓储接口。
 */
public interface PersonnelRepository {

    /**
     * 按页码与每页条数分页查询人员明细。
     *
     * @param current  页码
     * @param pageSize 每页条数
     * @return 人员明细分页结果，含总数、实际页码与实际每页条数
     */
    PageResult<Personnel> pagePersonnel(int current, int pageSize);
}
