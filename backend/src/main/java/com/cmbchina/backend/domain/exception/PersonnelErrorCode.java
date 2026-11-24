package com.cmbchina.backend.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 人员模块业务错误码。
 */
@Getter
@RequiredArgsConstructor
public enum PersonnelErrorCode implements IBizErrorCode {

    /**
     * 分页参数非法
     */
    INVALID_PARAMETER("分页参数不合法，页码与每页条数必须为大于 0 的整数");

    private final String errorMessage;
}
