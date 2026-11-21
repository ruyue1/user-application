package com.cmbchina.backend.adapter.web;

import com.cmbchina.backend.application.dto.AccessCardDeactivationResponse;
import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.application.service.AccessCardApplicationService;
import com.cmbchina.backend.common.response.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;

/**
 * 门禁卡 Web 控制器。
 */
@RestController
@RequestMapping("/api/access-cards")
public class AccessCardController {

    private final AccessCardApplicationService accessCardApplicationService;

    public AccessCardController(AccessCardApplicationService accessCardApplicationService) {
        this.accessCardApplicationService = accessCardApplicationService;
    }

    /**
     * 查询本人名下使用中门禁卡，委派应用服务并返回统一响应。
     *
     * @param current  当前页码
     * @param pageSize 每页记录数
     * @return 门禁卡分页响应
     */
    @GetMapping
    public ResponseEntity<AccessCardPageResponse> list(
            @RequestParam(name = "current", required = false, defaultValue = "1") @Min(1) Integer current,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") @Min(1) Integer pageSize) {
        return ResponseEntity.success(
                accessCardApplicationService.listAccessCards(current, pageSize));
    }

    /**
     * 申请离职注销，委派应用服务并返回统一响应。
     *
     * @param id 门禁卡记录唯一标识
     * @return 离职注销申请响应
     */
    @PostMapping("/{id}/deactivation-application")
    public ResponseEntity<AccessCardDeactivationResponse> applyDeactivation(
            @PathVariable("id") String id) {
        return ResponseEntity.success(
                accessCardApplicationService.applyDeactivation(id));
    }

}
