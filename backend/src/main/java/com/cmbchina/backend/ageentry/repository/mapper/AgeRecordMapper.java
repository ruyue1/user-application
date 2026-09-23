package com.cmbchina.backend.ageentry.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cmbchina.backend.ageentry.repository.po.AgeRecordPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * age_record 表 Mapper。
 *
 * 单表插入与主键查询由 BaseMapper 提供，配合 LambdaQueryWrapper/LambdaUpdateWrapper 表达，
 * 不在此声明等价的自定义方法。
 */
@Mapper
public interface AgeRecordMapper extends BaseMapper<AgeRecordPO> {
    // 基础 CRUD 由 MyBatis-Plus BaseMapper 提供，无需自定义方法
}
