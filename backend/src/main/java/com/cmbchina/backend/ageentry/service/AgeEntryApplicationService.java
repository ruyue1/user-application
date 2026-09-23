package com.cmbchina.backend.ageentry.service;

import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitInput;
import com.cmbchina.backend.ageentry.domain.dto.AgeSubmitOutput;

/**
 * 年龄录入应用服务接口。
 *
 * 承载端点 age_entry_api.submit（POST /api/age-entry）的业务用例，
 * 以 AgeSubmitInput / AgeSubmitOutput 作为唯一的内外边界类型，
 * 不向上层暴露持久化对象、上游传输类型或错误码实现细节。
 */
public interface AgeEntryApplicationService {

    /**
     * 校验并保存年龄录入页面提交的年龄值，返回保存结果。
     *
     * @param input 年龄提交请求，ageValue 为待保存的年龄值（必填）
     * @return 保存结果，包含新建记录标识、实际保存的年龄值与成功提示信息
     */
    AgeSubmitOutput submit(AgeSubmitInput input);
}
