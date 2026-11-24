package com.cmbchina.backend.personnel.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 人员明细领域实体。
 */
@Data
@NoArgsConstructor
public class Personnel {

    /**
     * 记录ID（唯一标识）
     */
    private Long id;

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别
     */
    private String gender;

    /**
     * 出生日期
     */
    private LocalDate birthDate;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 所属部门
     */
    private String department;

    /**
     * 职位
     */
    private String position;

    /**
     * 入职日期
     */
    private LocalDate hireDate;

    /**
     * 备注
     */
    private String remark;
}
