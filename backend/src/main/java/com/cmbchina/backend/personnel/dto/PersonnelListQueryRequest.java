package com.cmbchina.backend.personnel.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 人员列表查询请求对象。
 *
 * <p>对应 personnel_api.list 接口的 query 参数：
 * current(Integer, 可选, 默认 1)、pageSize(Integer, 可选, 默认 20)、keyword(String, 可选)。</p>
 */
@Getter
@Setter
public class PersonnelListQueryRequest {

    /**
     * 当前页码，可选，默认 1。
     */
    private Integer current;

    /**
     * 每页条数，可选，默认 20。
     */
    private Integer pageSize;

    /**
     * 关键字，可选。
     */
    private String keyword;

}
