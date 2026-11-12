package com.cmbchina.backend.system.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 系统时间查询响应。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemTimeResponse {

    /**
     * 后端系统当前时间，响应字段名为 current_time。
     */
    @JsonProperty("current_time")
    private String currentTime;
}
