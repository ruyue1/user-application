package com.cmbchina.backend.servertime.adapter.web;

import com.cmb.bee.web.entity.BeeResponseEntity;
import com.cmbchina.backend.servertime.application.dto.ServerTimeResponse;
import com.cmbchina.backend.servertime.application.service.ServerTimeApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 服务器时间 Web 适配控制器。
 */
@RestController
@RequestMapping("/api/server-time")
public class ServerTimeController {

    private final ServerTimeApplicationService serverTimeApplicationService;

    public ServerTimeController(ServerTimeApplicationService serverTimeApplicationService) {
        this.serverTimeApplicationService = serverTimeApplicationService;
    }

    /**
     * 读取服务器时间，委派应用服务并返回统一响应。
     *
     * @return 服务器时间统一响应
     */
    @GetMapping
    public BeeResponseEntity<ServerTimeResponse> readServerTime() {
        return BeeResponseEntity.success(serverTimeApplicationService.readServerTime());
    }
}
