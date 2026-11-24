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
     * PO 转领域实体，字段一一直接映射。
     */
    public Personnel toEntity(PersonnelPO po) {
        if (po == null) {
            return null;
        }
        Personnel personnel = new Personnel();
        personnel.setId(po.getId());
        personnel.setName(po.getName());
        personnel.setGender(po.getGender());
        personnel.setEmail(po.getEmail());
        personnel.setDepartment(po.getDepartment());
        personnel.setPosition(po.getPosition());
        personnel.setHireDate(po.getHireDate());
        personnel.setRemark(po.getRemark());
        return personnel;
    }

    /**
     * 领域实体转 PO，字段一一直接映射。
     */
    public PersonnelPO toPO(Personnel personnel) {
        if (personnel == null) {
            return null;
        }
        PersonnelPO po = new PersonnelPO();
        po.setId(personnel.getId());
        po.setName(personnel.getName());
        po.setGender(personnel.getGender());
        po.setEmail(personnel.getEmail());
        po.setDepartment(personnel.getDepartment());
        po.setPosition(personnel.getPosition());
        po.setHireDate(personnel.getHireDate());
        po.setRemark(personnel.getRemark());
        return po;
    }

    /**
     * PO 列表转领域实体列表。
     */
    public List<Personnel> toEntityList(List<PersonnelPO> poList) {
        List<Personnel> personnelList = new ArrayList<>();
        if (poList == null || poList.isEmpty()) {
            return personnelList;
        }
        for (PersonnelPO po : poList) {
            personnelList.add(toEntity(po));
        }
        return personnelList;
    }

    /**
     * 领域实体列表转 PO 列表。
     */
    public List<PersonnelPO> toPOList(List<Personnel> personnelList) {
        List<PersonnelPO> poList = new ArrayList<>();
        if (personnelList == null || personnelList.isEmpty()) {
            return poList;
        }
        for (Personnel personnel : personnelList) {
            poList.add(toPO(personnel));
        }
        return poList;
    }
}
