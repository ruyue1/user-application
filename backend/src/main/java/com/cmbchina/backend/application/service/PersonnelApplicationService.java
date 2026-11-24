package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.assembler.PersonnelDetailAssembler;
import com.cmbchina.backend.application.dto.PersonnelDetailItemDTO;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.domain.entity.Personnel;
import com.cmbchina.backend.domain.repository.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * 人员明细应用服务。
 */
@Service
@RequiredArgsConstructor
public class PersonnelApplicationService {

    private static final int DEFAULT_CURRENT = 1;

    private static final int DEFAULT_PAGE_SIZE = 20;

    private final PersonnelRepository personnelRepository;

    private final PersonnelDetailAssembler personnelDetailAssembler;

    /**
     * 分页查询人员明细。
     *
     * @param current  页码，缺省取 1
     * @param pageSize 每页条数，缺省取 20
     * @return 人员明细分页结果
     */
    public PageResult<PersonnelDetailItemDTO> listPersonnelDetails(Integer current, Integer pageSize) {
        int actualCurrent = (current == null || current < 1) ? DEFAULT_CURRENT : current;
        int actualPageSize = (pageSize == null || pageSize < 1) ? DEFAULT_PAGE_SIZE : pageSize;

        PageResult<Personnel> pageResult = personnelRepository.pagePersonnel(actualCurrent, actualPageSize);
        if (pageResult == null) {
            return new PageResult<>(0L, new ArrayList<>(), actualCurrent, actualPageSize, 0L);
        }
        return PageResult.convert(pageResult, personnelDetailAssembler::toDetailItem);
    }
}
