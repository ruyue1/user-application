package com.cmbchina.backend.adapter.web;

import com.cmbchina.backend.application.dto.GreetingResultDTO;
import com.cmbchina.backend.application.service.GreetingApplicationService;
import com.cmbchina.backend.common.response.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问候模块 Web 适配器。
 */
@RestController
@RequestMapping("/greeting")
@RequiredArgsConstructor
public class GreetingController {

    private final GreetingApplicationService greetingApplicationService;

    /**
     * 获取问候语，委派应用服务并返回统一响应。
     *
     * @return 问候语结果
     */
    @GetMapping
    public ResponseEntity<GreetingResultDTO> getGreeting() {
        return ResponseEntity.success(greetingApplicationService.getGreeting());
    }
}
