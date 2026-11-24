package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 问候语响应 DTO。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GreetingResultDTO {

    /**
     * 问候字符串，页面居中展示该内容
     */
    private String message;
}
