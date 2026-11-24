package com.cmbchina.backend.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 人员明细领域实体，对应 personnel 表，纯数据容器。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
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
     * 联系电话
     */
    private String phone;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 所属部门
     */
    private String department;

    /**
     * 入职日期
     */
    private LocalDate hireDate;

    /**
     * 备注
     */
    private String remark;
}
