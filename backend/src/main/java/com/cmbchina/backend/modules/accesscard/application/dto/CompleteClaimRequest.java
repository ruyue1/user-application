package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 完成领签请求，作为 PATCH /api/access-card-applications/claim 的请求体。
 *
 * <p>纯数据容器，不含处理逻辑；仅承载本次领签的申请明细记录 id 集合。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteClaimRequest {

    /**
     * 已勾选待领签申请明细的记录 id 列表，至少一条
     */
    private List<String> ids;

}
