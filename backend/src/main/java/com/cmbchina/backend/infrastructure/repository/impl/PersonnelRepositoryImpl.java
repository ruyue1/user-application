package com.cmbchina.backend.infrastructure.repository.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cmbchina.backend.common.page.PageResult;
import com.cmbchina.backend.domain.entity.Personnel;
import com.cmbchina.backend.domain.repository.PersonnelRepository;
import com.cmbchina.backend.infrastructure.mapper.PersonnelMapper;
import com.cmbchina.backend.infrastructure.po.PersonnelPO;
import com.cmbchina.backend.infrastructure.repository.converter.PersonnelPoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 人员明细仓储实现，PO 与 MyBatis Page 均不穿透到基础设施层之外。
 */
@Repository
@RequiredArgsConstructor
public class PersonnelRepositoryImpl implements PersonnelRepository {

    private final PersonnelMapper personnelMapper;

    private final PersonnelPoConverter personnelPoConverter;

    @Override
    public PageResult<Personnel> pageQuery(int current, int pageSize) {
        Page<PersonnelPO> page = new Page<>(current, pageSize);
        LambdaQueryWrapper<PersonnelPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByAsc(PersonnelPO::getId);
        Page<PersonnelPO> poPage = personnelMapper.selectPage(page, queryWrapper);

        List<Personnel> personnelList = personnelPoConverter.toEntities(poPage.getRecords());
        long total = poPage.getTotal();
        long actualCurrent = poPage.getCurrent();
        long actualPageSize = poPage.getSize();
        long totalPage = (actualPageSize <= 0) ? 0 : (total + actualPageSize - 1) / actualPageSize;
        return new PageResult<>(total, personnelList, actualCurrent, actualPageSize, totalPage);
    }
}
