package com.cmbchina.backend.modules.accesscard.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 本人待领签门禁卡申请明细分页响应，作为 GET /api/access-card-applications 的响应体。
 *
 * <p>纯数据容器，不含校验与业务逻辑；字段名与响应体层级严格对应契约 fieldMappings 路径。</p>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardApplicationPageResponse {

    /**
     * 匹配的申请明细总数
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
     * 当前页的待领签申请明细列表
     */
    private List<AccessCardApplicationItem> list;

    /**
     * 门禁卡申请明细，包含姓名、员工编号、卡号与领签状态。
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AccessCardApplicationItem {

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

}
