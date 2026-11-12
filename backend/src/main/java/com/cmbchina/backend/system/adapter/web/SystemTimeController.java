package com.cmbchina.backend.system.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.system.application.dto.SystemTimeResponse;
import com.cmbchina.backend.system.application.service.SystemTimeApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 系统时间端点 Web 适配器。
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SystemTimeController {

    private final SystemTimeApplicationService systemTimeApplicationService;

    /**
     * 获取后端系统当前时间。
     *
     * @return 统一响应包装的系统时间
     */
    @GetMapping("/hi")
    public ResponseEntity<SystemTimeResponse> getCurrentTime() {
        return ResponseEntity.success(systemTimeApplicationService.getCurrentTime());
    }
}
