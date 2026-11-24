package com.cmbchina.backend.personnel.infrastructure.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cmbchina.backend.personnel.infrastructure.po.PersonnelPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 人员明细 Mapper，仅提供单表 CRUD 与分页查询能力。
 */
@Mapper
public interface PersonnelMapper extends BaseMapper<PersonnelPO> {
}
