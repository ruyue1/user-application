package com.cmbchina.backend.greeting.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.greeting.application.dto.MorningGreetingResponse;
import com.cmbchina.backend.greeting.application.dto.NoonGreetingResponse;
import com.cmbchina.backend.greeting.application.service.GreetingApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问候语 Web 控制器。
 */
@RestController
@RequestMapping("/api/greetings")
@RequiredArgsConstructor
public class GreetingController {

    private final GreetingApplicationService greetingApplicationService;

    /**
     * 获取欢迎页展示的问候字符串“早上好！”。
     *
     * @return 统一响应包装的问候语结果
     */
    @GetMapping("/morning")
    public ResponseEntity<MorningGreetingResponse> getMorningGreeting() {
        return ResponseEntity.success(greetingApplicationService.getMorningGreeting());
    }

    /**
     * 获取午间问候页展示的问候字符串“中午好！”。
     *
     * @return 统一响应包装的午间问候语结果
     */
    @GetMapping("/noon")
    public ResponseEntity<NoonGreetingResponse> getNoonGreeting() {
        return ResponseEntity.success(greetingApplicationService.getNoonGreeting());
    }
}
