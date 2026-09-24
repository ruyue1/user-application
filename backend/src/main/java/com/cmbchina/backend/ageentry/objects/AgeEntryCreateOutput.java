package com.cmbchina.backend.ageentry.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 年龄录入响应对象：返回保存后的年龄记录信息与结果消息。
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeEntryCreateOutput {

    /**
     * 新建年龄记录的唯一标识。
     */
    private Long id;

    /**
     * 已保存的年龄值。
     */
    private Integer age;

    /**
     * 年龄记录保存时间的时间戳字符串表示。
     */
    private String createdAt;

    /**
     * 面向用户的结果消息。
     */
    private String message;
}
