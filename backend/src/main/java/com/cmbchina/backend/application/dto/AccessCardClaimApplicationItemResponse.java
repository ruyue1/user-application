package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡领用申请明细列表元素响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardClaimApplicationItemResponse {

    /**
     * 申请明细记录标识，取自实体主键
     */
    private String id;

    /**
     * 员工姓名
     */
    private String employeeName;

    /**
     * 员工编号
     */
    private String employeeNo;

    /**
     * 门禁卡卡号
     */
    private String cardNo;

    /**
     * 领签状态，取值：待领签、已领签
     */
    private String claimStatus;

}
