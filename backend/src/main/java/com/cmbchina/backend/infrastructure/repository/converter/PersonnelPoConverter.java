package com.cmbchina.backend.infrastructure.repository.converter;

import com.cmbchina.backend.domain.entity.Personnel;
import com.cmbchina.backend.infrastructure.po.PersonnelPO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 人员明细 PO 与领域实体转换器。
 */
@Component
public class PersonnelPoConverter {

    /**
     * PO 转领域实体，字段逐一同名映射。
     */
    public Personnel toEntity(PersonnelPO po) {
        if (po == null) {
            return null;
        }
        Personnel personnel = new Personnel();
        personnel.setId(po.getId());
        personnel.setName(po.getName());
        personnel.setGender(po.getGender());
        personnel.setPhone(po.getPhone());
        personnel.setEmail(po.getEmail());
        personnel.setDepartment(po.getDepartment());
        personnel.setHireDate(po.getHireDate());
        personnel.setRemark(po.getRemark());
        return personnel;
    }

    /**
     * PO 列表转领域实体列表。
     */
    public List<Personnel> toEntities(List<PersonnelPO> pos) {
        List<Personnel> personnelList = new ArrayList<>();
        if (pos == null || pos.isEmpty()) {
            return personnelList;
        }
        for (PersonnelPO po : pos) {
            personnelList.add(toEntity(po));
        }
        return personnelList;
    }
}
