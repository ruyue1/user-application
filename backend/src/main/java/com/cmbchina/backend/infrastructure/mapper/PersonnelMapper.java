package com.cmbchina.backend.infrastructure.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cmbchina.backend.infrastructure.po.PersonnelPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 人员明细 Mapper 接口，仅用于人员明细分页读取。
 */
@Mapper
public interface PersonnelMapper extends BaseMapper<PersonnelPO> {
}
