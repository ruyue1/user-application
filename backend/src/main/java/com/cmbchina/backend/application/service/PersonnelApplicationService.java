package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.assembler.PersonnelDetailAssembler;
import com.cmbchina.backend.application.dto.PersonnelDetailPageDTO;
import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.domain.entity.Personnel;
import com.cmbchina.backend.domain.exception.PersonnelErrorCode;
import com.cmbchina.backend.domain.repository.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
     * @param current  页码，缺省取 1；小于 1 视为非法参数
     * @param pageSize 每页条数，缺省取 20；小于 1 视为非法参数
     * @return 人员明细分页结果，页码与每页条数取自实际分页结果
     */
    public PersonnelDetailPageDTO listPersonnelDetails(Integer current, Integer pageSize) {
        if (current != null && current < 1) {
            throw new BizException(PersonnelErrorCode.INVALID_PARAMETER);
        }
        if (pageSize != null && pageSize < 1) {
            throw new BizException(PersonnelErrorCode.INVALID_PARAMETER);
        }

        int actualCurrent = (current == null) ? DEFAULT_CURRENT : current;
        int actualPageSize = (pageSize == null) ? DEFAULT_PAGE_SIZE : pageSize;

        PageResult<Personnel> pageResult = personnelRepository.pageQuery(actualCurrent, actualPageSize);
        return personnelDetailAssembler.toPageDTO(pageResult);
    }
}
