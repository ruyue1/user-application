package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 门禁卡信息响应，作为 PATCH /api/access-cards/cancellation 的响应体。
 *
 * <p>纯数据容器，不含校验与业务逻辑；字段名与响应体层级严格对应契约 AccessCard schema。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardResponse {

    /**
     * 门禁卡记录唯一标识
     */
    private String id;

    /**
     * 持卡员工姓名，例如「张三」
     */
    private String name;

    /**
     * 持卡员工员工编号，例如「12345678」
     */
    private String employeeNo;

    /**
     * 门禁卡卡号，例如「8888888」
     */
    private String cardNo;

    /**
     * 门禁卡当前权限状态，取值「使用中」或「已注销」
     */
    private String permissionStatus;

    /**
     * 注销申请状态，发起离职注销后为「离职」，未发起时为空
     */
    private String cancellationApplication;

}
