package com.cmbchina.backend.ageentry.repository.impl;

import com.cmbchina.backend.ageentry.domain.model.AgeRecordValue;
import com.cmbchina.backend.ageentry.repository.AgeRecordRepository;
import com.cmbchina.backend.ageentry.repository.mapper.AgeRecordMapper;
import com.cmbchina.backend.ageentry.repository.po.AgeRecordPO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

/**
 * 年龄记录仓储实现。
 *
 * 通过 BaseMapper 的 insert 与 selectById 完成 age_record 单表写入和主键查询，
 * 在持久化对象与内部值对象之间做类型化转换，不向上层暴露持久化模型。
 */
@Repository
@RequiredArgsConstructor
public class AgeRecordRepositoryImpl implements AgeRecordRepository {

    private final AgeRecordMapper ageRecordMapper;

    @Override
    public AgeRecordValue save(AgeRecordValue record) {
        if (record == null) {
            return null;
        }
        AgeRecordPO po = new AgeRecordPO();
        po.setAge(record.getAgeValue());
        ageRecordMapper.insert(po);
        record.setRecordId(po.getId());
        return record;
    }

    @Override
    public AgeRecordValue findById(Integer recordId) {
        if (recordId == null) {
            return null;
        }
        AgeRecordPO po = ageRecordMapper.selectById(recordId);
        if (po == null) {
            return null;
        }
        AgeRecordValue record = new AgeRecordValue();
        record.setRecordId(po.getId());
        record.setAgeValue(po.getAge());
        return record;
    }
}
