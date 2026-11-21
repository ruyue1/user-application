package com.cmbchina.backend.adapter.web;

import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.application.dto.DeactivationSubmissionRequest;
import com.cmbchina.backend.application.dto.DeactivationSubmissionResult;
import com.cmbchina.backend.application.service.ContractDeactivationSubmissionService;
import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.domain.exception.ContractDeactivationSubmissionErrorCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * 合同注销提交 Web 控制器。
 */
@RestController
@RequestMapping("/api/deactivation-submissions")
public class ContractDeactivationSubmissionController {

    private final ContractDeactivationSubmissionService contractDeactivationSubmissionService;

    public ContractDeactivationSubmissionController(
            ContractDeactivationSubmissionService contractDeactivationSubmissionService) {
        this.contractDeactivationSubmissionService = contractDeactivationSubmissionService;
    }

    /**
     * 查询本人使用中门禁卡，委派应用服务并返回统一响应。
     *
     * @param current  当前页码
     * @param pageSize 每页条数
     * @return 门禁卡分页响应
     */
    @GetMapping
    public ResponseEntity<AccessCardPageResponse> listCards(
            @RequestParam(name = "current", required = true) Integer current,
            @RequestParam(name = "pageSize", required = true) Integer pageSize) {
        if (current == null || current < 1 || pageSize == null || pageSize < 1) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.INVALID_PARAMETER);
        }
        return ResponseEntity.success(
                contractDeactivationSubmissionService.listAccessCards(current, pageSize));
    }

    /**
     * 提交离职注销申请，委派应用服务并返回统一响应。
     *
     * @param request 提交离职注销申请请求，携带目标门禁卡主键
     * @return 离职注销申请提交结果响应
     */
    @PostMapping
    public ResponseEntity<DeactivationSubmissionResult> submitDeactivation(
            @Valid @RequestBody DeactivationSubmissionRequest request) {
        return ResponseEntity.success(
                contractDeactivationSubmissionService.submitDeactivation(request));
    }

    /**
     * 查看注销申请提交结果，委派应用服务并返回统一响应。
     *
     * @param id 离职注销申请提交结果主键
     * @return 离职注销申请提交结果响应
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeactivationSubmissionResult> getDeactivationSubmission(
            @PathVariable("id") String id) {
        return ResponseEntity.success(
                contractDeactivationSubmissionService.getResult(id));
    }

}
