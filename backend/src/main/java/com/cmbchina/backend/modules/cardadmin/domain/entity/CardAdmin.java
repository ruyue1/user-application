package com.cmbchina.backend.modules.cardadmin.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 门禁卡管理员领域模型，持有区域、管理员姓名与工号，作为静态源数据到响应 DTO 之间的中间载体。
 *
 * <p>数据来源为 sourceBinding=static 的固定数据，仅承载字段与访问器，
 * 不包含持久化注解或表映射。</p>
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardAdmin {

    /**
     * 门禁卡管理员记录唯一标识
     */
    private String id;

    /**
     * 所属区域，取值为「园区」或「OCG」
     */
    private String region;

    /**
     * 管理员姓名，例如「李媛」「徐敏」
     */
    private String adminName;

    /**
     * 管理员工号，例如「WS04462」「IT006877」
     */
    private String adminNo;

}
