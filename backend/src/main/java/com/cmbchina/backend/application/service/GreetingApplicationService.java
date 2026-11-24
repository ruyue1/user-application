package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.dto.GreetingResultDTO;
import com.cmbchina.backend.domain.repository.GreetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 问候模块应用服务。
 */
@Service
@RequiredArgsConstructor
public class GreetingApplicationService {

    private static final String GREETING_MESSAGE = "晚上好！";

    private final GreetingRepository greetingRepository;

    /**
     * 获取问候语，返回固定问候字符串。
     *
     * @return 问候语响应，message 为固定问候字符串
     */
    public GreetingResultDTO getGreeting() {
        return new GreetingResultDTO(GREETING_MESSAGE);
    }
}
