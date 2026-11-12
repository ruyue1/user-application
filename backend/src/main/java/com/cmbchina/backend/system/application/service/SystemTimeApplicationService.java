package com.cmbchina.backend.system.application.service;

import com.cmbchina.backend.system.application.dto.SystemTimeResponse;
import org.springframework.stereotype.Service;

/**
 * 系统时间模块应用服务。
 */
@Service
public class SystemTimeApplicationService {

    /**
     * 契约静态数据源确认的固定系统时间。
     */
    private static final String CONFIRMED_CURRENT_TIME = "2024-06-03 14:27:35";

    /**
     * 获取系统时间。
     *
     * @return 系统时间响应
     */
    public SystemTimeResponse getCurrentTime() {
        if (CONFIRMED_CURRENT_TIME == null || CONFIRMED_CURRENT_TIME.isEmpty()) {
            throw new IllegalStateException("系统时间静态数据缺失");
        }
        return new SystemTimeResponse(CONFIRMED_CURRENT_TIME);
    }
}
