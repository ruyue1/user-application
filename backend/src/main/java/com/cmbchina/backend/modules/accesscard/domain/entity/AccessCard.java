package com.cmbchina.backend.modules.accesscard.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 门禁卡领域模型，持有门禁卡记录信息，作为静态源数据到响应 DTO 之间的中间载体。
 *
 * <p>纯领域数据容器，不含业务逻辑。</p>
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCard {

    /**
     * 门禁卡记录唯一标识，对应隐式主键
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
     * 注销申请状态，发起离职注销后为「离职」，未发起为空
     */
    private String cancellationApplication;

}
