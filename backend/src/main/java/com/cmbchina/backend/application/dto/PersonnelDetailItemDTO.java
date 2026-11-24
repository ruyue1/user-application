package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 人员明细分页列表项响应 DTO。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelDetailItemDTO {

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别
     */
    private String gender;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 座机号码
     */
    private String landline;

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
    private String entryDate;

    /**
     * 备注
     */
    private String remark;
}
