package com.cmbchina.backend.ageentry.repository.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 数据库 age_record 表持久化对象，用于年龄录入数据的写入。
 */
@Data
@TableName("age_record")
public class AgeRecordPO {

    /**
     * 主键，数据库自增。
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 年龄。
     */
    private Long age;
}
