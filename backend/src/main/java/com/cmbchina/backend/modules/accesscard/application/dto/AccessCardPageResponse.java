package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 使用中门禁卡分页列表响应，作为 GET /api/access-cards 的响应体。
 *
 * <p>纯数据容器，不含校验与业务逻辑；字段名与响应体层级严格对应契约 fieldMappings 路径。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardPageResponse {

    /**
     * 记录总数
     */
    private Integer total;

    /**
     * 每页记录数
     */
    private Integer pageSize;

    /**
     * 当前页码，从 1 开始
     */
    private Integer current;

    /**
     * 当前页门禁卡列表
     */
    private List<AccessCardItem> list;

    /**
     * 门禁卡记录，包含姓名、员工编号、卡号、权限状态与注销申请状态。
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccessCardItem {

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
         * 注销申请状态，发起离职注销后为「离职」，未发起为「无」
         */
        private String cancellationApplication;

    }

}
