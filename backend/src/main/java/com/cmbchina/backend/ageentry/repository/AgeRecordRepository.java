package com.cmbchina.backend.ageentry.repository;

import com.cmbchina.backend.ageentry.domain.model.AgeRecordValue;

/**
 * 年龄记录仓储接口。
 *
 * 仅声明年龄提交端点所需的 age_record 单表数据库访问能力：
 * 写入 age 列，以及按主键返回类型化查询结果。
 */
public interface AgeRecordRepository {

    /**
     * 新增一条年龄记录，将年龄值写入 age_record.age 列。
     *
     * @param record 待写入的年龄记录值对象，ageValue 为写入的年龄值
     * @return 回填了新建记录标识的年龄记录值对象
     */
    AgeRecordValue save(AgeRecordValue record);

    /**
     * 按主键查询年龄记录。
     *
     * @param recordId 年龄记录主键
     * @return 查询到的年龄记录值对象，不存在时返回 null
     */
    AgeRecordValue findById(Integer recordId);
}
