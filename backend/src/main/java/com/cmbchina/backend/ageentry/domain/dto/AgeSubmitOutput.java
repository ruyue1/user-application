package com.cmbchina.backend.ageentry.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 提交年龄接口（POST /api/age-entry）的响应体对象，对应 AgeSubmitOutput 契约结构。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeSubmitOutput {

    /**
     * 新建年龄记录的标识。
     */
    private Integer recordId;

    /**
     * 实际保存的年龄值。
     */
    private Integer savedAgeValue;

    /**
     * 面向用户的成功结果提示信息。
     */
    private String message;
}
