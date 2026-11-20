package com.cmbchina.backend.modules.cardadmin.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 门禁卡管理员列表响应，作为 GET /api/card-admins 的响应体。
 *
 * <p>纯数据容器，不含分页参数与校验逻辑；顶层字段与契约 CardAdminListResponse 的 list 对应。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardAdminListResponse {

    /**
     * 门禁卡管理员列表
     */
    private List<CardAdminResponse> list;

}
