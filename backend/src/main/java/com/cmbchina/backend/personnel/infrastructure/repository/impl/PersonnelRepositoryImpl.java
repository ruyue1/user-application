package com.cmbchina.backend.personnel.infrastructure.repository.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.personnel.domain.entity.Personnel;
import com.cmbchina.backend.personnel.domain.repository.PersonnelRepository;
import com.cmbchina.backend.personnel.infrastructure.mapper.PersonnelMapper;
import com.cmbchina.backend.personnel.infrastructure.po.PersonnelPO;
import com.cmbchina.backend.personnel.infrastructure.repository.converter.PersonnelConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 人员明细仓储实现。
 */
@Repository
@RequiredArgsConstructor
public class PersonnelRepositoryImpl implements PersonnelRepository {

    private final PersonnelMapper personnelMapper;

    @Override
    public PageResult<Personnel> page(int current, int pageSize) {
        Page<PersonnelPO> page = new Page<>(current, pageSize);
        LambdaQueryWrapper<PersonnelPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(PersonnelPO::getId);
        Page<PersonnelPO> poPage = personnelMapper.selectPage(page, wrapper);
        List<Personnel> list = PersonnelConverter.toEntityList(poPage.getRecords());
        long total = poPage.getTotal();
        return PageResult.of(total, current, pageSize, list, personnel -> personnel);
    }
}
