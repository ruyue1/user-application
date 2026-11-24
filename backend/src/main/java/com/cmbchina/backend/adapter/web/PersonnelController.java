package com.cmbchina.backend.adapter.web;

import com.cmbchina.backend.application.dto.PersonnelDetailItemDTO;
import com.cmbchina.backend.application.service.PersonnelApplicationService;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.common.response.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 人员明细 Web 适配器。
 */
@RestController
@RequestMapping("/personnel-details")
@RequiredArgsConstructor
public class PersonnelController {

    private static final String DEFAULT_CURRENT = "1";

    private static final String DEFAULT_PAGE_SIZE = "20";

    private final PersonnelApplicationService personnelApplicationService;

    /**
     * 分页查询人员明细，委派应用服务并返回统一响应。
     *
     * @param current  页码，非必填，默认 1
     * @param pageSize 每页条数，非必填，默认 20
     * @return 人员明细分页结果
     */
    @GetMapping
    public ResponseEntity<PageResult<PersonnelDetailItemDTO>> listPersonnelDetails(
            @RequestParam(value = "current", required = false, defaultValue = DEFAULT_CURRENT) Integer current,
            @RequestParam(value = "pageSize", required = false, defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize) {
        return ResponseEntity.success(
                personnelApplicationService.listPersonnelDetails(current, pageSize));
    }
}
