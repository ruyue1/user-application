package com.cmbchina.backend.ageentry.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 年龄录入模块错误码，覆盖端点契约声明的校验失败与内部处理失败两种情况。
 */
@Getter
@RequiredArgsConstructor
public enum AgeEntryErrorCode implements IBizErrorCode {

    /**
     * 提交的年龄值缺失或不符合录入规则。
     */
    VALIDATION_ERROR("年龄录入信息校验失败，请确认提交的年龄值有效"),

    /**
     * 年龄录入处理过程中出现未预期失败。
     */
    INTERNAL_ERROR("年龄录入失败，请稍后重试");

    /**
     * 面向用户的错误提示信息。
     */
    private final String errorMessage;
}
