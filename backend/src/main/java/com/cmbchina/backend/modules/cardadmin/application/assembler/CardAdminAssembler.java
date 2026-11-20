package com.cmbchina.backend.modules.cardadmin.application.assembler;

import com.cmbchina.backend.modules.cardadmin.application.dto.CardAdminResponse;
import com.cmbchina.backend.modules.cardadmin.domain.entity.CardAdmin;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 门禁卡管理员实体与响应 DTO 的转换器。
 *
 * <p>仅做实体到响应 DTO 的字段一一映射，不组装顶层响应，不包含业务筛选或排序逻辑。</p>
 */
@Component
public class CardAdminAssembler {

    /**
     * 将门禁卡管理员领域实体转换为响应项。
     *
     * @param cardAdmin 门禁卡管理员领域实体
     * @return 门禁卡管理员响应项
     */
    public CardAdminResponse toResponse(CardAdmin cardAdmin) {
        if (cardAdmin == null) {
            return null;
        }
        return new CardAdminResponse(
                cardAdmin.getId(),
                cardAdmin.getRegion(),
                cardAdmin.getAdminName(),
                cardAdmin.getAdminNo());
    }

    /**
     * 按原顺序将门禁卡管理员领域实体列表逐项转换为响应项列表。
     *
     * @param cardAdmins 门禁卡管理员领域实体列表
     * @return 门禁卡管理员响应项列表，顺序与入参一致
     */
    public List<CardAdminResponse> toItemList(List<CardAdmin> cardAdmins) {
        if (cardAdmins == null) {
            return new ArrayList<>();
        }
        return cardAdmins.stream()
                .filter(Objects::nonNull)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

}
