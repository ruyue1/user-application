package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡列表元素响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardItemResponse {

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
     * 门禁卡申请注销字段，发起离职注销后为离职，未发起时为空
     */
    private String deactivationApplication;

}
