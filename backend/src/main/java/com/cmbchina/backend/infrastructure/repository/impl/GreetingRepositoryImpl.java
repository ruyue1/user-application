package com.cmbchina.backend.infrastructure.repository.impl;

import com.cmbchina.backend.domain.repository.GreetingRepository;
import com.cmbchina.backend.infrastructure.mapper.PersonnelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

/**
 * 问候模块仓储实现，复用人员表来源绑定；本轮无确认的查询/写入条件，不新增查询逻辑。
 */
@Repository
@RequiredArgsConstructor
public class GreetingRepositoryImpl implements GreetingRepository {

    private final PersonnelMapper personnelMapper;
}
