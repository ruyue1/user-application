package com.cmbchina.backend.greeting.application.service;

import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.greeting.application.dto.GreetingMessageResponse;
import com.cmbchina.backend.greeting.domain.exception.GreetingErrorCode;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

/**
 * 问候应用服务
 */
@Service
public class GreetingApplicationService {

    private static final String GREETING_TEXT_KEY = "greetingText";
    private static final String GOOD_EVENING_GREETING_TEXT = "示例晚间问候：祝您度过一个宁静愉快的夜晚";
    private static final Map<String, String> STATIC_GREETING_SOURCE = Collections.singletonMap(
            GREETING_TEXT_KEY, GOOD_EVENING_GREETING_TEXT
    );
    private static final String WELCOME_WORLD_GREETING_TEXT = "你好，欢迎来到示例测试世界！";
    private static final Map<String, String> WELCOME_WORLD_STATIC_SOURCE = Collections.singletonMap(
            GREETING_TEXT_KEY, WELCOME_WORLD_GREETING_TEXT
    );

        /**
     * 获取欢迎世界问候语
     *
     * @return 问候语内容响应
     */
    public GreetingMessageResponse getWelcomeWorld() {
        String greetingText = WELCOME_WORLD_STATIC_SOURCE.get(GREETING_TEXT_KEY);
        if (greetingText == null || greetingText.isEmpty()) {
            throw new BizException(GreetingErrorCode.NOT_FOUND);
        }
        return GreetingMessageResponse.builder()
                .greetingText(greetingText)
                .build();
    }
}
