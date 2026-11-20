package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 完成领签响应，作为 PATCH /api/access-card-applications/claim 的响应体。
 *
 * <p>纯数据容器，不含处理逻辑；字段名与响应体层级严格对应契约 fieldMappings 路径。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteClaimResponse {

    /**
     * 本次更新为「已领签」的明细条数
     */
    private Integer updatedCount;

    /**
     * 更新后的申请明细列表
     */
    private List<CompleteClaimItemResponse> list;

}
