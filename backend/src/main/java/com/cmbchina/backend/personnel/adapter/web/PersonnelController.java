package com.cmbchina.backend.personnel.adapter.web;

import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.common.response.ResponseEntity;
import com.cmbchina.backend.personnel.application.dto.PersonnelDTO;
import com.cmbchina.backend.personnel.application.service.PersonnelApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 人员模块 Web 控制器。
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PersonnelController {

    private final PersonnelApplicationService personnelApplicationService;

    /**
     * 分页查询人员明细列表。
     *
     * @param current  当前页码，默认 1
     * @param pageSize 每页记录数，默认 20
     * @return 统一响应包装的人员明细分页结果
     */
    @GetMapping("/personnel")
    public ResponseEntity<PageResult<PersonnelDTO>> listPersonnel(
            @RequestParam(value = "current", required = false, defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize", required = false, defaultValue = "20") Integer pageSize) {
        return ResponseEntity.success(personnelApplicationService.listPersonnel(current, pageSize));
    }
}
