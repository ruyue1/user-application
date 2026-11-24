package com.cmbchina.backend.application.assembler;

import com.cmbchina.backend.application.dto.PersonnelDetailItemDTO;
import com.cmbchina.backend.application.dto.PersonnelDetailPageDTO;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.domain.entity.Personnel;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 人员明细 DTO 组装器。
 */
@Component
public class PersonnelDetailAssembler {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 领域分页结果转人员明细分页响应 DTO。
     *
     * @param page 领域分页结果
     * @return 人员明细分页响应 DTO
     */
    public PersonnelDetailPageDTO toPageDTO(PageResult<Personnel> page) {
        if (page == null) {
            return new PersonnelDetailPageDTO(0L, 1, 20, new ArrayList<>());
        }
        return new PersonnelDetailPageDTO(
                page.getTotal(),
                (int) page.getCurrent(),
                (int) page.getPageSize(),
                toDetailItems(page.getList()));
    }

    /**
     * 领域实体转人员明细列表项 DTO。
     */
    public PersonnelDetailItemDTO toItem(Personnel personnel) {
        if (personnel == null) {
            return null;
        }
        PersonnelDetailItemDTO item = new PersonnelDetailItemDTO();
        item.setName(personnel.getName());
        item.setGender(personnel.getGender());
        item.setAge(toAge(personnel.getId()));
        item.setPhone(personnel.getPhone());
        item.setLandline(personnel.getName());
        item.setEmail(personnel.getEmail());
        item.setDepartment(personnel.getDepartment());
        item.setEntryDate(formatDate(personnel.getHireDate()));
        item.setRemark(personnel.getRemark());
        return item;
    }

    /**
     * 领域实体列表转人员明细列表项 DTO 列表。
     */
    public List<PersonnelDetailItemDTO> toDetailItems(List<Personnel> personnelList) {
        List<PersonnelDetailItemDTO> itemList = new ArrayList<>();
        if (personnelList == null || personnelList.isEmpty()) {
            return itemList;
        }
        for (Personnel personnel : personnelList) {
            itemList.add(toItem(personnel));
        }
        return itemList;
    }

    private Integer toAge(Long id) {
        if (id == null) {
            return null;
        }
        if (id < Integer.MIN_VALUE || id > Integer.MAX_VALUE) {
            return null;
        }
        return id.intValue();
    }

    private String formatDate(LocalDate date) {
        if (date == null) {
            return null;
        }
        return date.format(DATE_FORMATTER);
    }
}
