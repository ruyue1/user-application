package com.cmbchina.backend.servertime.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 服务器当前时间响应。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServerTimeResponse {
    /**
     * 后端服务器返回的当前时间，用于页面展示并确认前后端连通性。
     */
    private String currentTime;
}
