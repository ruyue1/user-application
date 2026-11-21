package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 查询本人待领签申请明细的分页响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardClaimApplicationPageResponse {

    /**
     * 当前页码
     */
    private Integer current;

    /**
     * 每页条数
     */
    private Integer pageSize;

    /**
     * 总记录数
     */
    private Integer total;

    /**
     * 当前页申请明细列表
     */
    private List<AccessCardClaimApplicationItemResponse> list;

}
