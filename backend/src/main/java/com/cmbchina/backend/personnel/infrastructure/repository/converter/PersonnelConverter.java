package com.cmbchina.backend.personnel.infrastructure.repository.converter;

import com.cmbchina.backend.personnel.domain.entity.Personnel;
import com.cmbchina.backend.personnel.infrastructure.po.PersonnelPO;

import java.util.ArrayList;
import java.util.List;

/**
 * 人员 PO 与领域实体转换器。
 */
public final class PersonnelConverter {

    private PersonnelConverter() {
    }

    /**
     * PO 转领域实体，直接字段映射。
     *
     * @param source 人员 PO
     * @return 人员领域实体，source 为空时返回 null
     */
    public static Personnel toEntity(PersonnelPO source) {
        if (source == null) {
            return null;
        }
        Personnel target = new Personnel();
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
     * PO 列表转领域实体列表。
     *
     * @param source 人员 PO 列表
     * @return 人员领域实体列表，source 为空时返回空列表
     */
    public static List<Personnel> toEntityList(List<PersonnelPO> source) {
        List<Personnel> target = new ArrayList<>();
        if (source == null) {
            return target;
        }
        for (PersonnelPO po : source) {
            target.add(toEntity(po));
        }
        return target;
    }
}
