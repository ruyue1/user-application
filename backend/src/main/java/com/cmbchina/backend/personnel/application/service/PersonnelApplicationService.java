package com.cmbchina.backend.personnel.application.service;

import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.personnel.application.assembler.PersonnelAssembler;
import com.cmbchina.backend.personnel.application.dto.PersonnelDTO;
import com.cmbchina.backend.personnel.domain.entity.Personnel;
import com.cmbchina.backend.personnel.domain.repository.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 人员模块应用服务。
 */
@Service
@RequiredArgsConstructor
public class PersonnelApplicationService {

    /**
     * 默认页码。
     */
    private static final int DEFAULT_CURRENT = 1;

    /**
     * 默认每页记录数。
     */
    private static final int DEFAULT_PAGE_SIZE = 20;

    private final PersonnelRepository personnelRepository;

    /**
     * 分页查询人员明细列表。
     *
     * @param current  当前页码，为空时按契约默认值 1
     * @param pageSize 每页记录数，为空时按契约默认值 20
     * @return 人员明细分页结果，包含 list、total、current、pageSize
     */
    public PageResult<PersonnelDTO> listPersonnel(Integer current, Integer pageSize) {
        int actualCurrent = current == null ? DEFAULT_CURRENT : current;
        int actualPageSize = pageSize == null ? DEFAULT_PAGE_SIZE : pageSize;
        PageResult<Personnel> personnelPage = personnelRepository.page(actualCurrent, actualPageSize);
        List<PersonnelDTO> list = PersonnelAssembler.toDTOList(personnelPage.getList());
        long total = personnelPage.getTotal();
        long resultCurrent = personnelPage.getCurrent() > 0 ? personnelPage.getCurrent() : actualCurrent;
        long resultPageSize = personnelPage.getPageSize() > 0 ? personnelPage.getPageSize() : actualPageSize;
        return new PageResult<>(total, list, resultCurrent, resultPageSize, personnelPage.getTotalPage());
    }
}
