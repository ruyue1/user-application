package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 本人名下使用中门禁卡分页列表响应 DTO。
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessCardPageResponse {

    /**
     * 当前页码
     */
    private Integer current;

    /**
     * 每页记录数
     */
    private Integer pageSize;

    /**
     * 符合条件的门禁卡总数
     */
    private Integer total;

    /**
     * 当前页门禁卡记录列表
     */
    private List<AccessCardItemResponse> list;

}
