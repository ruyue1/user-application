package com.cmbchina.backend.greeting.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.greeting.application.dto.GreetingResponse;
import com.cmbchina.backend.greeting.application.service.GreetingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问候语端点控制器。
 */
@RestController
@RequestMapping("/api/hi")
public class GreetingController {

    @Autowired
    private GreetingApplicationService greetingApplicationService;

    /**
     * 获取问候语内容。
     *
     * @return 包装在 ResponseEntity 中的问候语响应
     */
    @GetMapping
    public ResponseEntity<GreetingResponse> getGreeting() {
        GreetingResponse response = greetingApplicationService.getGreeting();
        return ResponseEntity.success(response);
    }
}
