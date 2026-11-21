package com.cmbchina.backend.greeting.application.service;

import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.common.exception.IBizErrorCode;
import com.cmbchina.backend.greeting.application.dto.MorningGreetingResponse;
import com.cmbchina.backend.greeting.application.dto.NoonGreetingResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class GreetingApplicationService {

    private static final String MORNING_GREETING_TEXT = "早上好！";
    private static final String NOON_GREETING_TEXT = "中午好！";

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

    private static final IBizErrorCode INTERNAL_ERROR = new IBizErrorCode() {
        @Override
        public String getErrorCodeStr() {
            return "INTERNAL_ERROR";
        }

        @Override
        public String getErrorMessage() {
            return "午间问候语静态配置缺失或为空";
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

    public NoonGreetingResponse getNoonGreeting() {
        String noonGreetingText = NOON_GREETING_TEXT;
        if (!StringUtils.hasText(noonGreetingText)) {
            throw new BizException(INTERNAL_ERROR);
        }
        return NoonGreetingResponse.builder()
                .noonGreetingText(noonGreetingText)
                .build();
    }
}
