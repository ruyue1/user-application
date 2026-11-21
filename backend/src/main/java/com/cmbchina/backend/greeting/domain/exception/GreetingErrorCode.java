package com.cmbchina.backend.greeting.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 问候模块业务错误码
 */
@Getter
@RequiredArgsConstructor
public enum GreetingErrorCode implements IBizErrorCode {

    NOT_FOUND("问候语内容不存在"),
    INTERNAL_ERROR("获取问候语内容失败");

    private final String errorMessage;
}
