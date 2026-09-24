package com.cmbchina.backend.ageentry.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 年龄录入请求对象：承载提交待保存的年龄值。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeEntryCreateInput {

    /**
     * 待保存的年龄值，对应请求体中的 age 字段，必填。
     */
    @NotNull
    private Integer age;
}
