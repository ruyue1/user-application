package com.cmbchina.backend.modules.cardadmin.adapter.web;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.modules.cardadmin.application.dto.CardAdminListResponse;
import com.cmbchina.backend.modules.cardadmin.application.service.CardAdminApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 门禁卡管理员 HTTP 适配层，对外暴露门禁卡管理员列表查询接口。
 *
 * <p>接口无需鉴权与资源授权，不接收任何请求参数，数据组装完全委托应用服务处理。</p>
 */
@RestController
@RequestMapping("/api/card-admins")
public class CardAdminController {

    private final CardAdminApplicationService cardAdminApplicationService;

    public CardAdminController(CardAdminApplicationService cardAdminApplicationService) {
        this.cardAdminApplicationService = cardAdminApplicationService;
    }

    /**
     * 获取门禁卡管理员列表，委派应用服务并返回统一响应。
     *
     * @return 统一响应包装，包体为门禁卡管理员列表
     */
    @GetMapping
    public ResponseEntity<CardAdminListResponse> listCardAdmins() {
        return ResponseEntity.success(cardAdminApplicationService.listCardAdmins());
    }

}
