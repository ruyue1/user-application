package com.cmbchina.backend.personnel.infrastructure.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 人员明细持久化对象。
 */
@Data
@NoArgsConstructor
@TableName("personnel")
public class PersonnelPO {

    /**
     * 记录ID（唯一标识）
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 姓名
     */
    @TableField("name")
    private String name;

    /**
     * 性别
     */
    @TableField("gender")
    private String gender;

    /**
     * 出生日期
     */
    @TableField("birth_date")
    private LocalDate birthDate;

    /**
     * 电子邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 所属部门
     */
    @TableField("department")
    private String department;

    /**
     * 职位
     */
    @TableField("position")
    private String position;

    /**
     * 入职日期
     */
    @TableField("hire_date")
    private LocalDate hireDate;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;
}
