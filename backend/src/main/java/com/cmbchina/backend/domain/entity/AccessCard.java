package com.cmbchina.backend.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡领域实体，承载门禁卡业务中的一条卡片记录。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCard {

    /**
     * 卡片记录唯一标识
     */
    private String id;

    /**
     * 持有员工姓名
     */
    private String employeeName;

    /**
     * 持有员工编号
     */
    private String employeeNo;

    /**
     * 实体卡编号
     */
    private String cardNo;

    /**
     * 权限状态，列表中均为使用中
     */
    private String permissionStatus;

    /**
     * 注销申请标识，取值：离职；未发起时为空
     */
    private String deactivationApplication;

}
