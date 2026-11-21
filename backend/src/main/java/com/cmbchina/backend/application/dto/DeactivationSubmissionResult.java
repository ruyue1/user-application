package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 离职注销申请提交结果响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeactivationSubmissionResult {

    /**
     * 提交结果主键
     */
    private String id;

    /**
     * 本次申请注销的门禁卡主键
     */
    private String cardId;

    /**
     * 姓名
     */
    private String employeeName;

    /**
     * 员工编号
     */
    private String employeeNo;

    /**
     * 卡号
     */
    private String cardNo;

    /**
     * 申请注销状态，取值：离职
     */
    private String deactivationApply;

    /**
     * 同步状态，取值：已同步、同步失败
     */
    private String syncStatus;

    /**
     * 注销流程状态，取值：已发起、处理中、已完成
     */
    private String processStatus;

    /**
     * 提交时间，按契约字符串原样返回
     */
    private String submittedAt;

}
