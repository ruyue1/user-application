package com.cmbchina.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 人员明细分页响应 DTO。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelDetailPageDTO {

    /**
     * 总记录数
     */
    private Long total;

    /**
     * 当前页码
     */
    private Long current;

    /**
     * 每页条数
     */
    private Long pageSize;

    /**
     * 当前页人员明细记录列表
     */
    private List<PersonnelDetailItemDTO> list;
}
