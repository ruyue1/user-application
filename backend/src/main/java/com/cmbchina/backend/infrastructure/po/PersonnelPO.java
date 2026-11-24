package com.cmbchina.backend.infrastructure.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;

/**
 * 人员明细持久化对象，映射表 personnel。
 */
@Data
@TableName("personnel")
public class PersonnelPO {

    /**
     * 记录ID（唯一标识），BIGINT 自增主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 姓名，VARCHAR(100)，非空
     */
    @TableField("name")
    private String name;

    /**
     * 性别，VARCHAR(8)
     */
    @TableField("gender")
    private String gender;

    /**
     * 联系电话，VARCHAR(32)
     */
    @TableField("phone")
    private String phone;

    /**
     * 电子邮箱，VARCHAR(128)
     */
    @TableField("email")
    private String email;

    /**
     * 所属部门，VARCHAR(128)
     */
    @TableField("department")
    private String department;

    /**
     * 入职日期，DATE
     */
    @TableField("hire_date")
    private LocalDate hireDate;

    /**
     * 备注，TEXT
     */
    @TableField("remark")
    private String remark;
}
