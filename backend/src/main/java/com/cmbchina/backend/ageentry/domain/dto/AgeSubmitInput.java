package com.cmbchina.backend.ageentry.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 提交年龄接口（POST /api/age-entry）的请求体对象，对应 AgeSubmitInput 契约结构。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeSubmitInput {

    /**
     * 待保存的年龄值，请求体属性名为 age_value，必填。
     */
    @NotNull(message = "年龄值不能为空")
    @JsonProperty("age_value")
    private Integer ageValue;
}
