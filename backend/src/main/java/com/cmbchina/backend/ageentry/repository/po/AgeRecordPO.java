package com.cmbchina.backend.ageentry.repository.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 数据库 age_record 表持久化对象。
 *
 * 仅映射确认的来源快照字段：主键 id 与年龄列 age（bigint），不引入快照之外的列。
 */
@Data
@TableName("age_record")
public class AgeRecordPO {

    /**
     * 主键，对应 age_record.id；新增后由数据库自增值回填，作为响应中的记录标识来源。
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 年龄，对应 age_record.age（bigint），由年龄提交接口写入。
     */
    @TableField("age")
    private Long age;
}
