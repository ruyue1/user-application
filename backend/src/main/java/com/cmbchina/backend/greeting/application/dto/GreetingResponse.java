package com.cmbchina.backend.greeting.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 问候语响应 DTO。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GreetingResponse {

    /**
     * 问候语内容，固定为"欢迎来到我的世界！"
     */
    private String content;
}
