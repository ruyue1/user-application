package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 发起离职注销申请请求，作为 PATCH /api/access-cards/cancellation 的请求体。
 *
 * <p>纯数据容器，不含处理逻辑；仅承载需要发起离职注销的门禁卡记录标识。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CancelAccessCardRequest {

    /**
     * 需要发起离职注销的门禁卡记录标识，来源于使用中门禁卡列表中的记录 id
     */
    private String accessCardId;

}
