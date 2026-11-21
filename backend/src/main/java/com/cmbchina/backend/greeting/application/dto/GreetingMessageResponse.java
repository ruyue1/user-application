package com.cmbchina.backend.greeting.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 问候语内容响应
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GreetingMessageResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 接口返回并供前端页面展示的问候字符串内容
     */
    @NotNull
    private String greetingText;
}
