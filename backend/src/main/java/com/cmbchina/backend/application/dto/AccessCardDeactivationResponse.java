package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 离职注销申请响应 DTO，返回提交成功后更新后的门禁卡记录。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardDeactivationResponse {

    /**
     * 门禁卡记录唯一标识
     */
    private String id;

    /**
     * 门禁卡持有员工姓名
     */
    private String employeeName;

    /**
     * 门禁卡持有员工编号
     */
    private String employeeNo;

    /**
     * 门禁卡实体卡编号
     */
    private String cardNo;

    /**
     * 门禁卡权限状态，取值：使用中
     */
    private String permissionStatus;

    /**
     * 申请注销字段，提交成功后为离职
     */
    private String deactivationApplication;

}
