package com.cmbchina.backend.adapter.web;

import com.cmbchina.backend.application.dto.AccessCardClaimApplicationPageResponse;
import com.cmbchina.backend.application.dto.CompleteClaimRequest;
import com.cmbchina.backend.application.dto.CompleteClaimResult;
import com.cmbchina.backend.application.service.AccessCardClaimApplicationService;
import com.cmbchina.backend.common.response.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;

/**
 * 门禁卡领用申请 Web 控制器。
 */
@RestController
@RequestMapping("/api/access-card-claim-applications")
public class AccessCardClaimApplicationController {

    private final AccessCardClaimApplicationService accessCardClaimApplicationService;

    public AccessCardClaimApplicationController(
            AccessCardClaimApplicationService accessCardClaimApplicationService) {
        this.accessCardClaimApplicationService = accessCardClaimApplicationService;
    }

    /**
     * 查询本人待领签申请明细，委派应用服务并返回统一响应。
     *
     * @param current  当前页码
     * @param pageSize 每页条数
     * @return 待领签申请明细分页响应
     */
    @GetMapping
    public ResponseEntity<AccessCardClaimApplicationPageResponse> list(
            @RequestParam(name = "current") @Min(1) Integer current,
            @RequestParam(name = "pageSize") @Min(1) Integer pageSize) {
        return ResponseEntity.success(
                accessCardClaimApplicationService.list(current, pageSize));
    }

    /**
     * 完成领签，委派应用服务并返回统一响应。
     *
     * @param request 完成领签请求，携带勾选或全选的申请明细标识
     * @return 完成领签结果响应
     */
    @PostMapping("/complete-claim")
    public ResponseEntity<CompleteClaimResult> completeClaim(
            @Valid @RequestBody CompleteClaimRequest request) {
        return ResponseEntity.success(
                accessCardClaimApplicationService.completeClaim(request));
    }

}
