package com.cmbchina.backend.greeting.application.service;

import com.cmbchina.backend.greeting.application.dto.GreetingResponse;
import org.springframework.stereotype.Service;

/**
 * 问候语应用服务。
 */
@Service
public class GreetingApplicationService {

    /**
     * 获取问候语。
     * <p>
     * sourceType 为 static，staticData.content 为固定值"欢迎来到我的世界！"，
     * 直接将该静态值设置到 GreetingResponse.content 并返回。
     *
     * @return 包含固定问候语内容的响应
     */
    public GreetingResponse getGreeting() {
        GreetingResponse response = new GreetingResponse();
        response.setContent("欢迎来到我的世界！");
        return response;
    }
}
