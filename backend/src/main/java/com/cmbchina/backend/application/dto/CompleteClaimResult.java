package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 完成领签结果响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteClaimResult {

    /**
     * 本次更新为已领签的申请明细条数
     */
    private Integer updatedCount;

    /**
     * 本次完成领签的申请明细标识列表
     */
    private List<String> applicationIds;

}
