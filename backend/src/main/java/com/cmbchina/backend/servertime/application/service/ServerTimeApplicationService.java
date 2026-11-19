package com.cmbchina.backend.servertime.application.service;

import com.cmbchina.backend.servertime.application.dto.ServerTimeResponse;
import org.springframework.stereotype.Service;

/**
 * 服务器时间模块应用服务。
 */
@Service
public class ServerTimeApplicationService {

    /**
     * 静态来源 static_1.currentTime 的取值，保持契约中的字面量，不做时间格式化。
     */
    private static final String CURRENT_TIME = "";

    /**
     * 读取服务器时间。
     *
     * @return 服务器时间响应
     */
    public ServerTimeResponse readServerTime() {
        return new ServerTimeResponse(CURRENT_TIME);
    }
}
