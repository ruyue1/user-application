package com.cmbchina.backend.ageentry.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 年龄录入内部值对象：承载待写入 age_record.age 的年龄值与新建记录标识，
 * 作为请求/响应 DTO 与数据库写入之间的类型化转换边界。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeRecordValue {

    /**
     * 待写入 age_record.age（bigint）的年龄值。
     */
    private Long ageValue;

    /**
     * 新建年龄记录的标识，对应 AgeRecord.id。
     */
    private Integer recordId;
}
