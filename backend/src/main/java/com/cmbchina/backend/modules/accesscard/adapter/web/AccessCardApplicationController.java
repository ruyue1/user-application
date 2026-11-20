package com.cmbchina.backend.modules.accesscard.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardApplicationPageResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.CancelAccessCardRequest;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimRequest;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimResponse;
import com.cmbchina.backend.modules.accesscard.application.service.AccessCardApplicationService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;

/**
 * 门禁卡申请 HTTP 适配层，对外暴露本人待领签申请明细查询、本人使用中门禁卡列表查询与完成领签接口。
 *
 * <p>接口无需鉴权，仅做参数绑定与委派，筛选、分页与领签状态更新等业务逻辑由应用服务实现。</p>
 */
@Validated
@RestController
@RequestMapping("/api/access-card-applications")
public class AccessCardApplicationController {

    private final AccessCardApplicationService accessCardApplicationService;

    public AccessCardApplicationController(AccessCardApplicationService accessCardApplicationService) {
        this.accessCardApplicationService = accessCardApplicationService;
    }

    /**
     * 获取本人待领签申请明细，委派应用服务并返回统一响应。
     *
     * @param claimerId 招乎扫码识别出的扫码人ID，用于匹配领签人字段
     * @param current   当前页码，从 1 开始
     * @param pageSize  每页记录数
     * @return 统一响应包装，包体为本人待领签申请明细分页结果
     */
    @GetMapping
    public ResponseEntity<AccessCardApplicationPageResponse> listAccessCardApplications(
            @RequestParam("claimerId") String claimerId,
            @RequestParam("current") Integer current,
            @RequestParam("pageSize") Integer pageSize) {
        return ResponseEntity.success(accessCardApplicationService.listAccessCardApplications(
                claimerId, current, pageSize));
    }

    /**
     * 获取本人使用中门禁卡列表，委派应用服务并返回统一响应。
     *
     * @param current  当前页码，从 1 开始
     * @param pageSize 每页记录数
     * @return 统一响应包装，包体为本人使用中门禁卡分页结果
     */
    @GetMapping("/api/access-cards")
    public ResponseEntity<AccessCardPageResponse> listAccessCards(
            @RequestParam(value = "current", required = true, defaultValue = "1") @Min(1) Integer current,
            @RequestParam(value = "pageSize", required = true, defaultValue = "10") @Min(1) Integer pageSize) {
        return ResponseEntity.success(accessCardApplicationService.listAccessCards(current, pageSize));
    }

    /**
     * 完成领签，委派应用服务将已勾选申请明细的领签状态更新为「已领签」并返回统一响应。
     *
     * @param request 完成领签请求，承载本次领签的申请明细记录 id 集合
     * @return 统一响应包装，包体为本次更新条数与更新后的申请明细列表
     */
    @PatchMapping("/claim")
    public ResponseEntity<CompleteClaimResponse> completeClaim(
            @Valid @RequestBody CompleteClaimRequest request) {
        return ResponseEntity.success(accessCardApplicationService.completeClaim(request));
    }

    /**
     * 发起离职注销申请，委派应用服务将门禁卡的注销申请状态更新为「离职」并返回统一响应。
     *
     * @param request 发起离职注销申请请求，承载需要发起离职注销的门禁卡记录标识
     * @return 统一响应包装，包体为更新后的门禁卡信息
     */
    @PatchMapping("/api/access-cards/cancellation")
    public ResponseEntity<AccessCardResponse> applyCancellation(
            @Valid @RequestBody CancelAccessCardRequest request) {
        return ResponseEntity.success(accessCardApplicationService.applyCancellation(request));
    }

}
