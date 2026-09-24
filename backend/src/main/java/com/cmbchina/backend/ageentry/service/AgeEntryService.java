package com.cmbchina.backend.ageentry.service;

import com.cmbchina.backend.ageentry.domain.exception.AgeEntryErrorCode;
import com.cmbchina.backend.ageentry.objects.AgeEntryCreateInput;
import com.cmbchina.backend.ageentry.objects.AgeEntryCreateOutput;
import com.cmbchina.backend.ageentry.repository.mapper.AgeRecordMapper;
import com.cmbchina.backend.ageentry.repository.po.AgeRecordPO;
import com.cmbchina.backend.common.exception.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 年龄录入应用服务：本 Endpoint 的请求绑定、字段映射、单表写入与响应转换均在此完成。
 * Mapper 与持久化对象仅在本层内部使用，不向外暴露。
 */
@Service
@RequiredArgsConstructor
public class AgeEntryService {

    /**
     * 保存时间的时间戳字符串格式。
     */
    private static final DateTimeFormatter CREATED_AT_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    /**
     * 录入成功时返回给用户的结果消息。
     */
    private static final String SUCCESS_MESSAGE = "年龄录入成功";

    private final AgeRecordMapper ageRecordMapper;

    /**
     * 校验并保存提交的年龄值，返回录入结果。
     *
     * @param input 年龄录入请求，age 为待保存的年龄值
     * @return 保存后的年龄记录信息与结果消息
     */
    @Transactional(rollbackFor = Exception.class)
    public AgeEntryCreateOutput create(AgeEntryCreateInput input) {
        validate(input);

        AgeRecordPO ageRecord = new AgeRecordPO();
        ageRecord.setAge(input.getAge().longValue());
        ageRecordMapper.insert(ageRecord);

        LocalDateTime savedAt = LocalDateTime.now();
        return new AgeEntryCreateOutput(
                ageRecord.getId(),
                input.getAge(),
                CREATED_AT_FORMATTER.format(savedAt),
                SUCCESS_MESSAGE);
    }

    /**
     * 校验年龄录入的必填项与录入规则，不通过时抛出端点契约声明的校验失败错误码。
     *
     * @param input 年龄录入请求
     */
    private void validate(AgeEntryCreateInput input) {
        if (input == null || input.getAge() == null || input.getAge() < 0) {
            throw new BizException(AgeEntryErrorCode.VALIDATION_ERROR);
        }
    }
}
