package com.cmbchina.backend.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 合同注销提交模块业务错误码，与契约 error_codes 保持一致。
 */
@Getter
@RequiredArgsConstructor
public enum ContractDeactivationSubmissionErrorCode implements IBizErrorCode {

    /**
     * 请求参数缺失或不合法
     */
    INVALID_PARAMETER("请求参数不能为空或格式不合法"),

    /**
     * 门禁卡记录不存在
     */
    NOT_FOUND("门禁卡不存在"),

    /**
     * 门禁卡当前状态不允许发起离职注销申请
     */
    INVALID_STATE("门禁卡当前状态不允许发起离职注销申请");

    private final String errorMessage;
}
