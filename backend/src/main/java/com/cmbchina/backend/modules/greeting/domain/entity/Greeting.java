package com.cmbchina.backend.modules.greeting.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 问候语领域模型，持有问候语内容，作为静态源数据到响应 DTO 之间的中间载体。
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Greeting {

    /**
     * 问候语内容
     */
    private String content;

}
