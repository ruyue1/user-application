package com.cmbchina.backend.ageentry.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cmbchina.backend.ageentry.repository.po.AgeRecordPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * age_record 表数据访问接口，新增与主键回填由 BaseMapper 提供。
 */
@Mapper
public interface AgeRecordMapper extends BaseMapper<AgeRecordPO> {
}
