package com.cmbchina.backend.application.assembler;

import com.cmbchina.backend.application.dto.AccessCardClaimApplicationItemResponse;
import com.cmbchina.backend.application.dto.AccessCardClaimApplicationPageResponse;
import com.cmbchina.backend.application.dto.CompleteClaimResult;
import com.cmbchina.backend.domain.entity.AccessCardClaimApplication;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 门禁卡领用申请模块的 DTO 与领域实体转换组件。
 */
@Component
public class AccessCardClaimApplicationAssembler {

    /**
     * 将申请明细领域实体转换为列表元素响应。
     *
     * @param entity 申请明细领域实体
     * @return 申请明细列表元素响应
     */
    public AccessCardClaimApplicationItemResponse toItemResponse(AccessCardClaimApplication entity) {
        if (entity == null) {
            return null;
        }
        AccessCardClaimApplicationItemResponse response = new AccessCardClaimApplicationItemResponse();
        response.setId(entity.getId());
        response.setEmployeeName(entity.getEmployeeName());
        response.setEmployeeNo(entity.getEmployeeNo());
        response.setCardNo(entity.getCardNo());
        response.setClaimStatus(entity.getClaimStatus());
        return response;
    }

    /**
     * 组装待领签申请明细分页响应。
     *
     * @param current  当前页码
     * @param pageSize 每页条数
     * @param total    总记录数
     * @param list     当前页申请明细列表
     * @return 分页响应
     */
    public AccessCardClaimApplicationPageResponse toPageResponse(
            int current, int pageSize, int total, List<AccessCardClaimApplicationItemResponse> list) {
        AccessCardClaimApplicationPageResponse response = new AccessCardClaimApplicationPageResponse();
        response.setCurrent(current);
        response.setPageSize(pageSize);
        response.setTotal(total);
        response.setList(list);
        return response;
    }

    /**
     * 组装完成领签结果响应。
     *
     * @param updatedApplicationIds 本次完成领签的申请明细标识列表
     * @param updatedCount          本次更新为已领签的申请明细条数
     * @return 完成领签结果响应
     */
    public CompleteClaimResult toCompleteClaimResult(List<String> updatedApplicationIds, Integer updatedCount) {
        CompleteClaimResult result = new CompleteClaimResult();
        result.setUpdatedCount(updatedCount);
        result.setApplicationIds(updatedApplicationIds);
        return result;
    }

}
