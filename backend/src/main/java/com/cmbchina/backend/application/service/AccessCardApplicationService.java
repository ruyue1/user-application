package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.assembler.AccessCardAssembler;
import com.cmbchina.backend.application.dto.AccessCardDeactivationResponse;
import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.domain.entity.AccessCard;
import com.cmbchina.backend.domain.exception.ContractDeactivationSubmissionErrorCode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 门禁卡模块应用服务。
 */
@Service
public class AccessCardApplicationService {

    private static final int DEFAULT_CURRENT = 1;

    private static final int DEFAULT_PAGE_SIZE = 10;

    /**
     * 门禁卡权限状态：使用中
     */
    private static final String PERMISSION_STATUS_IN_USE = "使用中";

    /**
     * 申请注销字段取值：离职
     */
    private static final String DEACTIVATION_APPLICATION_RESIGN = "离职";

    /**
     * 静态数据源：本人名下使用中的门禁卡记录。
     */
    private static final List<AccessCard> ACCESS_CARDS = Collections.unmodifiableList(Arrays.asList(
            new AccessCard("AC-CARD-20240612-001", "林晓舟", "EMP10086", "CARD-8842015",
                    PERMISSION_STATUS_IN_USE, null),
            new AccessCard("AC-CARD-20240612-002", "赵一鸣", "EMP10087", "CARD-8842016",
                    PERMISSION_STATUS_IN_USE, null)
    ));

    private final AccessCardAssembler accessCardAssembler;

    public AccessCardApplicationService(AccessCardAssembler accessCardAssembler) {
        this.accessCardAssembler = accessCardAssembler;
    }

    /**
     * 查询本人名下使用中的门禁卡，按 current、pageSize 对静态卡片记录进行内存分页。
     *
     * @param current  当前页码，为空或小于 1 时使用默认值 1
     * @param pageSize 每页记录数，为空或小于 1 时使用默认值 10
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse listAccessCards(Integer current, Integer pageSize) {
        int resolvedCurrent = current == null || current < 1 ? DEFAULT_CURRENT : current;
        int resolvedPageSize = pageSize == null || pageSize < 1 ? DEFAULT_PAGE_SIZE : pageSize;

        int total = ACCESS_CARDS.size();
        long fromIndex = (long) (resolvedCurrent - 1) * resolvedPageSize;
        List<AccessCard> pageData;
        if (fromIndex >= total) {
            pageData = Collections.emptyList();
        } else {
            long toIndex = Math.min(fromIndex + resolvedPageSize, total);
            pageData = new ArrayList<>(ACCESS_CARDS.subList((int) fromIndex, (int) toIndex));
        }

        return accessCardAssembler.toPageResponse(
                pageData, total, resolvedCurrent, resolvedPageSize);
    }

    /**
     * 申请离职注销：按 id 查询本人名下门禁卡记录，记录不存在时抛出 NOT_FOUND，
     * 权限状态不满足使用中时抛出 INVALID_STATE；校验通过后将申请注销字段置为离职，
     * 保留其余字段，最终响应由装配器按契约字段映射组装。
     *
     * @param id 门禁卡记录唯一标识
     * @return 离职注销申请响应
     */
    public AccessCardDeactivationResponse applyDeactivation(String id) {
        AccessCard accessCard = findAccessCard(id);
        if (accessCard == null) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.NOT_FOUND);
        }
        if (!PERMISSION_STATUS_IN_USE.equals(accessCard.getPermissionStatus())) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.INVALID_STATE);
        }

        AccessCard updatedAccessCard = new AccessCard(
                accessCard.getId(),
                accessCard.getEmployeeName(),
                accessCard.getEmployeeNo(),
                accessCard.getCardNo(),
                accessCard.getPermissionStatus(),
                DEACTIVATION_APPLICATION_RESIGN);

        return accessCardAssembler.toDeactivationResponse(updatedAccessCard);
    }

    /**
     * 按门禁卡记录唯一标识查找静态门禁卡记录。
     *
     * @param id 门禁卡记录唯一标识
     * @return 匹配的门禁卡记录，未找到时返回 null
     */
    private AccessCard findAccessCard(String id) {
        if (id == null || id.trim().isEmpty()) {
            return null;
        }
        String targetId = id.trim();
        for (AccessCard accessCard : ACCESS_CARDS) {
            if (targetId.equals(accessCard.getId())) {
                return accessCard;
            }
        }
        return null;
    }

}
