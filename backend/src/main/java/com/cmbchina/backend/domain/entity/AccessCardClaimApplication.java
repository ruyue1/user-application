package com.cmbchina.backend.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡领用申请明细领域实体，承载静态数据源中的一条申请记录。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardClaimApplication {

    /**
     * 申请明细记录标识
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
