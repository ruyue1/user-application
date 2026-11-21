package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 完成领签请求 DTO，提交勾选或全选的申请明细。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteClaimRequest {

    /**
     * 需要完成领签的申请明细标识列表，来源于明细列表返回的 id
     */
    private List<String> applicationIds;

}
