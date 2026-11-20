package com.cmbchina.backend.modules.greeting.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.modules.greeting.application.dto.GreetingResponse;
import com.cmbchina.backend.modules.greeting.application.service.GreetingApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 问候语 HTTP 适配层，对外暴露问候语查询接口。
 *
 * <p>接口无需鉴权，不接收任何请求参数，业务取值完全委托应用服务处理。</p>
 */
@RestController
@RequestMapping("/api")
public class GreetingController {

    private final GreetingApplicationService greetingApplicationService;

    public GreetingController(GreetingApplicationService greetingApplicationService) {
        this.greetingApplicationService = greetingApplicationService;
    }

    /**
     * 获取问候语，委派应用服务并返回统一响应。
     *
     * @return 统一响应包装，包体为问候语内容
     */
    @GetMapping("/greetings")
    public ResponseEntity<GreetingResponse> getGreeting() {
        String content = greetingApplicationService.getGreetingContent();
        return ResponseEntity.success(new GreetingResponse(content));
    }

}
