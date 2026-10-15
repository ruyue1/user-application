package com.cmbchina.backend.personnel.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cmbchina.backend.personnel.dto.PersonnelItem;
import com.cmbchina.backend.personnel.dto.PersonnelListQueryRequest;
import com.cmbchina.backend.personnel.dto.PersonnelListResponse;

/**
 * 人员列表应用服务。
 *
 * <p>实现 personnel_api.list 接口的静态数据字段映射：
 * 数据源为确认的静态数据（sourceType=static，staticData.total=1），
 * 不访问数据库、不调用上游接口。</p>
 */
@Service
public class PersonnelListService {

    /**
     * 静态数据源字段 total，确认值为 1（missingBehavior=error，静态数据中恒存在）。
     */
    private static final int STATIC_TOTAL = 1;

    /**
     * 固定值映射：响应 pageSize。
     */
    private static final int FIXED_PAGE_SIZE = 1;

    /**
     * 固定值映射：响应 current。
     */
    private static final int FIXED_CURRENT = 1;

    /**
     * 按确认的静态数据与固定值映射组装人员列表响应。
     *
     * <p>执行顺序：
     * 1. total 取静态数据源字段 total（processingType=direct）；
     * 2. pageSize、current 取确认的固定值映射；
     * 3. list 无数组源，按 total=1 生成一条记录，各字段均为固定值映射。</p>
     *
     * @param request 人员列表查询请求（静态映射下不参与数据检索）
     * @return 组装完成的人员列表响应
     */
    public PersonnelListResponse list(PersonnelListQueryRequest request) {
        PersonnelListResponse response = new PersonnelListResponse();

        // source_mapping：static → total，processingType=direct
        response.setTotal(STATIC_TOTAL);

        // value_mapping：固定值
        response.setPageSize(FIXED_PAGE_SIZE);
        response.setCurrent(FIXED_CURRENT);

        // list 无数组源，依据 total 生成对应条数的固定值记录
        List<PersonnelItem> items = new ArrayList<PersonnelItem>(STATIC_TOTAL);
        for (int i = 0; i < STATIC_TOTAL; i++) {
            items.add(buildFixedItem());
        }
        response.setList(items);

        return response;
    }

    /**
     * 构造一条固定值映射的人员明细记录。
     *
     * @return 固定值人员明细项
     */
    private PersonnelItem buildFixedItem() {
        PersonnelItem item = new PersonnelItem();
        item.setPersonnelId("1");
        item.setName("1");
        item.setGender("male");
        item.setDepartment("1");
        item.setPosition("aaa");
        item.setPhone("123");
        item.setEmail("3333@");
        item.setHireDate("333");
        item.setStatus("1");
        item.setCreatedAt("33");
        return item;
    }

}
