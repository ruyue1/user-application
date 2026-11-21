package com.cmbchina.backend.greeting.application.service;

import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.common.exception.IBizErrorCode;
import com.cmbchina.backend.greeting.application.dto.MorningGreetingResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class GreetingApplicationService {

    private static final String MORNING_GREETING_TEXT = "早上好！";

    private static final IBizErrorCode INTERNAL_SERVER_ERROR = new IBizErrorCode() {
        @Override
        public String getErrorCodeStr() {
            return "INTERNAL_SERVER_ERROR";
        }

        @Override
        public String getErrorMessage() {
            return "问候语静态配置缺失或为空";
        }
    };

    public MorningGreetingResponse getMorningGreeting() {
        String morningGreetingText = MORNING_GREETING_TEXT;
        if (!StringUtils.hasText(morningGreetingText)) {
            throw new BizException(INTERNAL_SERVER_ERROR);
        }
        return MorningGreetingResponse.builder()
                .morningGreetingText(morningGreetingText)
                .build();
    }
}
