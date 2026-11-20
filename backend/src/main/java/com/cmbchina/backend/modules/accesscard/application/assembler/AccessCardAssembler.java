package com.cmbchina.backend.modules.accesscard.application.assembler;

import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimItemResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimResponse;
import com.cmbchina.backend.modules.accesscard.domain.entity.AccessCard;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 门禁卡模块共享装配器，负责领域对象到响应 DTO 的转换。
 *
 * <p>仅做同名字段直接映射，不做格式转换；后续门禁卡相关端点在本类追加方法并保留已有方法。</p>
 */
@Component
public class AccessCardAssembler {

    /**
     * 将门禁卡列表与分页信息装配为分页响应。
     *
     * @param cards    当前页门禁卡记录列表
     * @param total    记录总数
     * @param current  当前页码，从 1 开始
     * @param pageSize 每页记录数
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse toPageResponse(List<AccessCard> cards, long total, int current, int pageSize) {
        List<AccessCardPageResponse.AccessCardItem> list = new ArrayList<>();
        for (AccessCard card : Optional.ofNullable(cards).orElse(new ArrayList<>())) {
            list.add(toItem(card));
        }
        return new AccessCardPageResponse((int) total, pageSize, current, list);
    }

    /**
     * 将单个门禁卡领域对象转换为响应条目，同名字段直接映射。
     *
     * @param card 门禁卡记录
     * @return 门禁卡响应条目
     */
    private AccessCardPageResponse.AccessCardItem toItem(AccessCard card) {
        return new AccessCardPageResponse.AccessCardItem(
                card.getId(),
                card.getName(),
                card.getEmployeeNo(),
                card.getCardNo(),
                card.getPermissionStatus(),
                card.getCancellationApplication());
    }

    /**
     * 将单个门禁卡领域对象转换为门禁卡信息响应，同名字段一一对应直接映射。
     *
     * @param card 门禁卡记录
     * @return 门禁卡信息响应
     */
    public AccessCardResponse toAccessCardResponse(AccessCard card) {
        return new AccessCardResponse(
                card.getId(),
                card.getName(),
                card.getEmployeeNo(),
                card.getCardNo(),
                card.getPermissionStatus(),
                card.getCancellationApplication());
    }

    /**
     * 将完成领签的明细数据与更新条数装配为完成领签响应，同名字段一一对应直接映射。
     *
     * @param updatedCount 本次更新为「已领签」的明细条数
     * @param items        更新后的申请明细列表
     * @return 完成领签响应
     */
    public CompleteClaimResponse toCompleteClaimResponse(Integer updatedCount,
                                                         List<CompleteClaimItemResponse> items) {
        List<CompleteClaimItemResponse> list = new ArrayList<>();
        for (CompleteClaimItemResponse item : Optional.ofNullable(items).orElse(new ArrayList<>())) {
            list.add(toCompleteClaimItem(item));
        }
        return new CompleteClaimResponse(updatedCount, list);
    }

    /**
     * 将单条完成领签明细数据转换为响应明细项，同名字段直接映射。
     *
     * @param item 完成领签明细数据
     * @return 完成领签响应明细项
     */
    private CompleteClaimItemResponse toCompleteClaimItem(CompleteClaimItemResponse item) {
        return new CompleteClaimItemResponse(
                item.getId(),
                item.getName(),
                item.getEmployeeNo(),
                item.getCardNo(),
                item.getClaimStatus());
    }

}
