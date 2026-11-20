package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 完成领签响应中的门禁卡申请明细项，包含姓名、员工编号、卡号与领签状态。
 *
 * <p>纯数据容器，不含处理逻辑。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteClaimItemResponse {

    /**
     * 申请明细的唯一标识
     */
    private String id;

    /**
     * 员工姓名，例如「张三」
     */
    private String name;

    /**
     * 员工工号，例如「12345678」
     */
    private String employeeNo;

    /**
     * 门禁卡卡号，例如「8888888」
     */
    private String cardNo;

    /**
     * 领签状态，取值「待领签」或「已领签」
     */
    private String claimStatus;

}
