package com.cmbchina.backend.personnel.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * 人员列表响应对象。
 *
 * <p>承载 personnel_api.list 接口的 PersonnelListOutput 响应结构，
 * 必填字段：total、pageSize、current、list。</p>
 */
@Getter
@Setter
public class PersonnelListResponse {

    /**
     * 总记录数。必填。
     */
    private Integer total;

    /**
     * 每页条数。必填。
     */
    private Integer pageSize;

    /**
     * 当前页码。必填。
     */
    private Integer current;

    /**
     * 人员明细列表。必填。
     */
    private List<PersonnelItem> list = new ArrayList<PersonnelItem>();

}
