package com.cmbchina.backend.personnel.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 人员明细响应 DTO。
 */
@Data
@NoArgsConstructor
public class PersonnelDTO {

    /**
     * 人员记录的整数唯一标识。
     */
    private Long id;

    /**
     * 人员的姓名。
     */
    private String name;

    /**
     * 人员的性别。
     */
    private String gender;

    /**
     * 人员的出生日期。
     */
    private LocalDate birthDate;

    /**
     * 人员的电子邮箱地址。
     */
    private String email;

    /**
     * 人员所属的部门名称。
     */
    private String department;

    /**
     * 人员在组织中的职位名称。
     */
    private String position;

    /**
     * 人员的入职日期。
     */
    private LocalDate hireDate;

    /**
     * 人员的补充说明信息。
     */
    private String remark;
}
