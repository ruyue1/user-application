package com.cmbchina.backend.modules.cardadmin.application.service;

import com.cmbchina.backend.modules.cardadmin.application.assembler.CardAdminAssembler;
import com.cmbchina.backend.modules.cardadmin.application.dto.CardAdminListResponse;
import com.cmbchina.backend.modules.cardadmin.domain.entity.CardAdmin;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * 门禁卡管理员应用服务。
 *
 * <p>作为门禁卡管理员模块唯一的应用服务，后续端点在同一类中追加方法。
 * 数据来源为 sourceBinding=static 的固定数据，直接按固定顺序组装响应，
 * 不访问数据库、缓存或外部 API，不做分页与过滤。</p>
 */
@Service
public class CardAdminApplicationService {

    /**
     * 门禁卡管理员静态数据，按契约固定顺序排列
     */
    private static final List<CardAdmin> STATIC_CARD_ADMINS = Arrays.asList(
            new CardAdmin("adc-7f3a-1001", "园区", "李媛", "WS04462"),
            new CardAdmin("adc-7f3a-1002", "OCG", "徐敏", "IT006877"),
            new CardAdmin("adc-7f3a-1003", "园区", "陈立", "WS05138"));

    private final CardAdminAssembler cardAdminAssembler;

    public CardAdminApplicationService(CardAdminAssembler cardAdminAssembler) {
        this.cardAdminAssembler = cardAdminAssembler;
    }

    /**
     * 获取门禁卡管理员列表。
     *
     * @return 门禁卡管理员列表响应，按固定顺序包含全部门禁卡管理员
     */
    public CardAdminListResponse listCardAdmins() {
        return new CardAdminListResponse(cardAdminAssembler.toItemList(STATIC_CARD_ADMINS));
    }

}
