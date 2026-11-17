package com.cmbchina.backend.systemtime.application.service;

import com.cmbchina.backend.systemtime.application.dto.SystemTimeResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * 系统时间模块应用服务。
 *
 * <p>模块内唯一应用服务类，后续端点在此类追加方法并保留 {@link #getCurrentTime()}。</p>
 */
@Service
@RequiredArgsConstructor
public class SystemTimeApplicationService {

    private static final DateTimeFormatter CURRENT_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 读取后端系统当前时间，截断到秒并按 yyyy-MM-dd HH:mm:ss 格式化后返回。
     *
     * <p>每次请求实时读取服务器时钟，不使用静态占位值；不访问数据库或外部服务。</p>
     *
     * @return 仅包含当前时间（精确到秒）的响应对象
     */
    public SystemTimeResponse getCurrentTime() {
        LocalDateTime currentDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        return new SystemTimeResponse(CURRENT_TIME_FORMATTER.format(currentDateTime));
    }
}
