package com.cmbchina.backend.modules.cardadmin.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡管理员信息响应，作为 GET /api/card-admins 响应体 list 数组的元素。
 *
 * <p>纯响应传输类型，字段名与响应体层级严格对应契约 fieldMappings 路径。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardAdminResponse {

    /**
     * 门禁卡管理员记录唯一标识
     */
    private String id;

    /**
     * 所属区域，取值「园区」或「OCG」
     */
    private String region;

    /**
     * 管理员姓名，例如「李媛」「徐敏」
     */
    private String adminName;

    /**
     * 管理员工号，例如「WS04462」「IT006877」
     */
    private String adminNo;

}
