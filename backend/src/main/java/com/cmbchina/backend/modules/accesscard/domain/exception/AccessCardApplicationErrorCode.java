package com.cmbchina.backend.modules.accesscard.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 门禁卡申请模块业务错误码。
 *
 * <p>由应用服务在业务校验失败时通过 {@code BizException} 抛出，
 * 统一由 {@code BaseExceptionHandler} 转换为响应体。</p>
 */
@Getter
@RequiredArgsConstructor
public enum AccessCardApplicationErrorCode implements IBizErrorCode {

    /**
     * 请求参数不合法，例如必填查询参数缺失或分页参数小于 1
     */
    INVALID_PARAMETER("参数不合法"),

    /**
     * 本人名下不存在该门禁卡记录
     */
    NOT_FOUND("本人名下不存在该门禁卡"),

    /**
     * 当前权限状态不允许发起离职注销，仅「使用中」的门禁卡可发起
     */
    INVALID_STATE("当前权限状态不允许发起离职注销");

    private final String errorMessage;

}
