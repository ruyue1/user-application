package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 提交离职注销申请的请求 DTO，指明本人名下使用中的门禁卡。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeactivationSubmissionRequest {

    /**
     * 发起离职注销申请所对应的门禁卡主键，来源于本人使用中门禁卡列表返回的 id
     */
    private String cardId;

}
