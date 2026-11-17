package com.cmbchina.backend.systemtime.adapter.web;

import com.cmb.bee.web.entity.BeeResponseEntity;
import com.cmbchina.backend.systemtime.application.dto.SystemTimeResponse;
import com.cmbchina.backend.systemtime.application.service.SystemTimeApplicationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 系统时间模块 Web 适配器。
 *
 * <p>只负责 HTTP 路由与响应体包装，时间读取与格式化由应用服务完成；
 * 该端点无需鉴权，不使用上游路径，也不直接访问仓储或外部客户端。</p>
 */
@RestController
@RequestMapping("/api/system-time")
@RequiredArgsConstructor
public class SystemTimeController {

    private final SystemTimeApplicationService systemTimeApplicationService;

    /**
     * 获取后端系统当前时间。
     *
     * <p>无请求参数，每次请求实时委托应用服务读取服务器时钟并以成功响应体返回。</p>
     *
     * @return 包装当前时间响应的统一成功响应体
     */
    @GetMapping("/current")
    public BeeResponseEntity<SystemTimeResponse> getCurrentTime() {
        return BeeResponseEntity.success(systemTimeApplicationService.getCurrentTime());
    }
}
