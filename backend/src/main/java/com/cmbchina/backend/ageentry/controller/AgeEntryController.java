package com.cmbchina.backend.ageentry.controller;

import com.cmbchina.backend.ageentry.objects.AgeEntryCreateInput;
import com.cmbchina.backend.ageentry.objects.AgeEntryCreateOutput;
import com.cmbchina.backend.ageentry.service.AgeEntryService;
import com.cmbchina.backend.common.response.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * 年龄录入接口适配层。
 * 绑定内部端点 POST /api/age-entry，仅做协议适配与请求参数校验，业务处理委派给应用服务。
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/age-entry")
public class AgeEntryController {

    private final AgeEntryService ageEntryService;

    /**
     * 提交年龄录入。
     *
     * @param input 年龄录入请求体，age 为待保存的年龄值
     * @return 统一响应封装的成功结果，业务体为年龄录入响应对象
     */
    @PostMapping
    public ResponseEntity<AgeEntryCreateOutput> create(@Valid @RequestBody AgeEntryCreateInput input) {
        return ResponseEntity.success(ageEntryService.create(input));
    }
}
