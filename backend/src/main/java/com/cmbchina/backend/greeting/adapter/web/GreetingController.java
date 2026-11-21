package com.cmbchina.backend.greeting.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.greeting.application.dto.GreetingMessageResponse;
import com.cmbchina.backend.greeting.application.service.GreetingApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问候语 Web 控制器
 */
@RestController
@RequestMapping("/api/greetings")
public class GreetingController {

    private final GreetingApplicationService greetingApplicationService;

    public GreetingController(GreetingApplicationService greetingApplicationService) {
        this.greetingApplicationService = greetingApplicationService;
    }

        /**
     * 获取欢迎世界问候语
     *
     * @return 统一响应包装的问候语内容响应
     */
    @GetMapping("/welcome-world")
    public ResponseEntity<GreetingMessageResponse> getWelcomeWorld() {
        return ResponseEntity.success(greetingApplicationService.getWelcomeWorld());
    }
}
