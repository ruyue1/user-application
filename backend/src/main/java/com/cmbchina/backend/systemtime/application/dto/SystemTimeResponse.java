package com.cmbchina.backend.systemtime.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 后端系统当前时间响应。
 *
 * <p>仅作为响应载体，不承载取时间或格式化逻辑。</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemTimeResponse {

    /**
     * 后端系统在响应请求时返回的当前时间，精确到秒，格式为 yyyy-MM-dd HH:mm:ss。
     */
    private String currentTime;
}
