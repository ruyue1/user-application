package com.cmbchina.backend.personnel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.personnel.dto.PersonnelListQueryRequest;
import com.cmbchina.backend.personnel.dto.PersonnelListResponse;
import com.cmbchina.backend.personnel.service.PersonnelListService;

/**
 * 人员接口控制器。
 *
 * <p>对应 personnel_api.list 接口：GET /api/personnel，
 * 分页查询人员明细数据，供HR在人员明细列表页面查看人员详细字段信息。</p>
 *
 * <p>接口认证要求为 false，且授权约束为空，因此不添加任何授权注解。</p>
 */
@RestController
public class PersonnelController {

    /**
     * 人员列表应用服务。
     */
    private final PersonnelListService personnelListService;

    public PersonnelController(PersonnelListService personnelListService) {
        this.personnelListService = personnelListService;
    }

    /**
     * 分页查询人员明细列表。
     *
     * @param current  当前页码，可选，契约默认 1
     * @param pageSize 每页条数，可选，契约默认 20
     * @param keyword  关键字，可选
     * @return 包装后的人员列表响应
     */
    @GetMapping("/api/personnel")
    public ResponseEntity<PersonnelListResponse> personnelList(
            @RequestParam(value = "current", required = false) Integer current,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "keyword", required = false) String keyword) {
        PersonnelListQueryRequest request = new PersonnelListQueryRequest();
        request.setCurrent(current);
        request.setPageSize(pageSize);
        request.setKeyword(keyword);

        PersonnelListResponse response = personnelListService.list(request);
        return ResponseEntity.success(response);
    }

}
