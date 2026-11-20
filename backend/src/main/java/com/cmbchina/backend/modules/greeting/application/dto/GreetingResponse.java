package com.cmbchina.backend.modules.greeting.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 问候语展示响应，作为 GET /api/greetings 的响应体。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GreetingResponse {

    /**
     * 接口返回并展示给前端的问候字符串，默认内容为「早上好！」
     */
    private String content;

}
