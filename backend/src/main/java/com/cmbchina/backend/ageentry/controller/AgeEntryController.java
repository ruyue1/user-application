package com.cmbchina.backend.ageentry.controller;

import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitInput;
import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitOutput;
import com.cmbchina.backend.ageentry.service.AgeEntryApplicationService;
import com.cmbchina.backend.common.response.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * 年龄录入接口适配层，承载端点 age_entry_api.submit（POST /api/age-entry）。
 *
 * 只负责 HTTP 协议适配、请求体类型化绑定与参数校验，业务用例委托给应用服务完成。
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/age-entry")
public class AgeEntryController {

    private final AgeEntryApplicationService ageEntryApplicationService;

    /**
     * 提交单个年龄值并返回保存结果。
     *
     * @param request 年龄提交请求体，age_value 为必填的待保存年龄值
     * @return 统一响应封装的保存结果（新建记录标识、实际保存的年龄值与成功提示信息）
     */
    @PostMapping
    public ResponseEntity<AgeSubmitOutput> submit(@Valid @RequestBody AgeSubmitInput request) {
        return ResponseEntity.success(ageEntryApplicationService.submit(request));
    }
}
