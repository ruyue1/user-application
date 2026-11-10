package com.cmbchina.backend.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CrosConfig implements WebMvcConfigurer {

    /**
     * 默认仅放行本地开发地址，部署环境可通过配置项覆盖为明确的来源白名单。
     */
    private static final String DEFAULT_ALLOWED_ORIGIN_PATTERNS = "http://localhost:3000,http://127.0.0.1:3000";

    @Value("${app.cors.allowed-origin-patterns:" + DEFAULT_ALLOWED_ORIGIN_PATTERNS + "}")
    private String[] allowedOriginPatterns = {"http://localhost:3000", "http://127.0.0.1:3000"};

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 允许所有接口
                .allowedOriginPatterns(allowedOriginPatterns) // 仅允许白名单内的来源
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允许的方法
                .allowedHeaders("*") // 允许的请求头
                .allowCredentials(true) // 是否允许携带 cookie
                .maxAge(3600); // 预检请求缓存时间（秒）
    }
}
