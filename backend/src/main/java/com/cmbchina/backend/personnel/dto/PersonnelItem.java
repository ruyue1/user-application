package com.cmbchina.backend.personnel.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 人员明细列表项对象。
 *
 * <p>对应 personnel_api.list 响应字段 list[]（PersonnelListItem），
 * 必填字段：personnelId、name、gender、department、status；
 * 可选字段：position、phone、email、hireDate、createdAt。</p>
 */
@Getter
@Setter
public class PersonnelItem {

    /**
     * 人员编号。必填。
     */
    private String personnelId;

    /**
     * 人员姓名。必填。
     */
    private String name;

    /**
     * 人员性别。必填。
     */
    private String gender;

    /**
     * 所属部门。必填。
     */
    private String department;

    /**
     * 岗位。可选。
     */
    private String position;

    /**
     * 联系电话。可选。
     */
    private String phone;

    /**
     * 邮箱。可选。
     */
    private String email;

    /**
     * 入职日期。可选。
     */
    private String hireDate;

    /**
     * 在职状态。必填。
     */
    private String status;

    /**
     * 创建时间。可选。
     */
    private String createdAt;

}
