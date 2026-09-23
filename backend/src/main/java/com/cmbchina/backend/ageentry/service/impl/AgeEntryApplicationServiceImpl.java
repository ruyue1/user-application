package com.cmbchina.backend.ageentry.service.impl;

import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitInput;
import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitOutput;
import com.cmbchina.backend.ageentry.domain.exception.AgeEntryErrorCode;
import com.cmbchina.backend.ageentry.domain.model.AgeRecordValue;
import com.cmbchina.backend.ageentry.repository.AgeRecordRepository;
import com.cmbchina.backend.ageentry.service.AgeEntryApplicationService;
import com.cmbchina.backend.common.exception.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 年龄录入应用服务实现。
 *
 * 编排端点 age_entry_api.submit 的完整用例：
 * 绑定请求中的年龄值、校验年龄取值、通过仓储写入 age_record.age，
 * 并组装最终响应（新建记录标识、实际保存的年龄值、成功提示信息）。
 * 仅使用 Endpoint DTO 与内部值对象，不向调用方暴露持久化模型。
 */
@Service
@RequiredArgsConstructor
public class AgeEntryApplicationServiceImpl implements AgeEntryApplicationService {

    /**
     * 面向用户的成功结果提示信息。
     */
    private static final String SAVE_SUCCESS_MESSAGE = "年龄信息提交成功";

    private final AgeRecordRepository ageRecordRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AgeSubmitOutput submit(AgeSubmitInput input) {
        Long ageValue = resolveAgeValue(input);

        AgeRecordValue record = new AgeRecordValue();
        record.setAgeValue(ageValue);
        AgeRecordValue savedRecord = ageRecordRepository.save(record);
        if (savedRecord == null || savedRecord.getRecordId() == null) {
            throw new BizException(AgeEntryErrorCode.INTERNAL_ERROR);
        }

        Long savedAgeValue = savedRecord.getAgeValue() == null ? ageValue : savedRecord.getAgeValue();

        AgeSubmitOutput output = new AgeSubmitOutput();
        output.setRecordId(savedRecord.getRecordId());
        output.setSavedAgeValue(Integer.valueOf(savedAgeValue.intValue()));
        output.setMessage(SAVE_SUCCESS_MESSAGE);
        return output;
    }

    /**
     * 读取并校验请求中的年龄值，转换为写入 age_record.age（bigint）所需的类型。
     *
     * @param input 年龄提交请求
     * @return 合法的年龄值
     * @throws BizException 年龄值缺失或取值不合法时抛出 INVALID_AGE
     */
    private Long resolveAgeValue(AgeSubmitInput input) {
        if (input == null || input.getAgeValue() == null) {
            throw new BizException(AgeEntryErrorCode.INVALID_AGE);
        }
        Integer ageValue = input.getAgeValue();
        if (ageValue.intValue() < 0) {
            throw new BizException(AgeEntryErrorCode.INVALID_AGE);
        }
        return Long.valueOf(ageValue.longValue());
    }
}
