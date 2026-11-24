package com.cmbchina.backend.personnel.application.assembler;

import com.cmbchina.backend.personnel.application.dto.PersonnelDTO;
import com.cmbchina.backend.personnel.domain.entity.Personnel;

import java.util.ArrayList;
import java.util.List;

/**
 * 人员领域实体到响应 DTO 的转换器。
 */
public final class PersonnelAssembler {

    private PersonnelAssembler() {
    }

    /**
     * 领域实体转响应 DTO，直接字段映射。
     *
     * @param source 人员领域实体
     * @return 人员明细响应 DTO，source 为空时返回 null
     */
    public static PersonnelDTO toDTO(Personnel source) {
        if (source == null) {
            return null;
        }
        PersonnelDTO target = new PersonnelDTO();
        target.setId(source.getId());
        target.setName(source.getName());
        target.setGender(source.getGender());
        target.setBirthDate(source.getBirthDate());
        target.setEmail(source.getEmail());
        target.setDepartment(source.getDepartment());
        target.setPosition(source.getPosition());
        target.setHireDate(source.getHireDate());
        target.setRemark(source.getRemark());
        return target;
    }

    /**
     * 领域实体列表转响应 DTO 列表。
     *
     * @param source 人员领域实体列表
     * @return 人员明细响应 DTO 列表，source 为空时返回空列表
     */
    public static List<PersonnelDTO> toDTOList(List<Personnel> source) {
        List<PersonnelDTO> target = new ArrayList<>();
        if (source == null) {
            return target;
        }
        for (Personnel personnel : source) {
            target.add(toDTO(personnel));
        }
        return target;
    }
}
