package com.cmbchina.backend.ageentry.domain.exception;

import com.cmbchina.backend.common.exception.IBizErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 年龄录入模块级业务错误码。
 *
 * 仅覆盖冻结端点契约 age_entry_api.submit 声明的错误码集合：
 * INVALID_AGE（年龄取值不合法）与 INTERNAL_ERROR（年龄记录保存失败）。
 */
@Getter
@RequiredArgsConstructor
public enum AgeEntryErrorCode implements IBizErrorCode {

    /**
     * 提交的年龄取值不合法，无法保存。
     */
    INVALID_AGE("年龄值不合法，请填写有效的年龄"),

    /**
     * 年龄记录保存失败，未能取得新建记录标识。
     */
    INTERNAL_ERROR("年龄信息保存失败，请稍后重试");

    /**
     * 面向用户的错误提示文案，由公共异常处理器统一输出为 errorMsg。
     */
    private final String errorMessage;
}
