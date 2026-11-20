package com.cmbchina.backend.modules.greeting.application.service;

import com.cmbchina.backend.modules.greeting.domain.entity.Greeting;
import org.springframework.stereotype.Service;

/**
 * 问候语应用服务。
 *
 * <p>按 sourceBinding=static 的固定数据源直接返回静态问候语内容，
 * 无数据库、缓存或外部 API 访问，不做参数校验或额外转换。</p>
 */
@Service
public class GreetingApplicationService {

    /**
     * 静态问候语内容「早上好！」
     */
    private static final Greeting STATIC_GREETING = new Greeting("早上好！");

    /**
     * 获取问候语内容。
     *
     * @return 问候语内容
     */
    public String getGreetingContent() {
        return STATIC_GREETING.getContent();
    }

}
