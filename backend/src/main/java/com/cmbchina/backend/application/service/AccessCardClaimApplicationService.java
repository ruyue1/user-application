package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.assembler.AccessCardClaimApplicationAssembler;
import com.cmbchina.backend.application.dto.AccessCardClaimApplicationItemResponse;
import com.cmbchina.backend.application.dto.AccessCardClaimApplicationPageResponse;
import com.cmbchina.backend.application.dto.CompleteClaimRequest;
import com.cmbchina.backend.application.dto.CompleteClaimResult;
import com.cmbchina.backend.domain.entity.AccessCardClaimApplication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 门禁卡领用申请模块应用服务。
 */
@Service
public class AccessCardClaimApplicationService {

    private static final int DEFAULT_CURRENT = 1;

    private static final int DEFAULT_PAGE_SIZE = 3;

    /**
     * 静态数据源：完成领签返回的更新条数。
     */
    private static final Integer STATIC_UPDATED_COUNT = 3;

    /**
     * 静态数据源：完成领签涉及的申请明细标识列表。
     */
    private static final List<String> STATIC_UPDATED_APPLICATION_IDS = Collections.unmodifiableList(Arrays.asList(
            "APP-20240517-001",
            "APP-20240517-002",
            "APP-20240517-003"
    ));

    /**
     * 静态数据源：本人待领签申请明细。
     */
    private static final List<AccessCardClaimApplication> CLAIM_APPLICATIONS = Collections.unmodifiableList(Arrays.asList(
            new AccessCardClaimApplication("AC-20240612-001", "林晓舟", "EMP10086", "CARD-8842015", "待领签"),
            new AccessCardClaimApplication("AC-20240612-002", "赵一鸣", "EMP10087", "CARD-8842016", "已领签"),
            new AccessCardClaimApplication("AC-20240612-003", "陈思远", "EMP10088", "CARD-8842017", "待领签")
    ));

    private final AccessCardClaimApplicationAssembler accessCardClaimApplicationAssembler;

    public AccessCardClaimApplicationService(
            AccessCardClaimApplicationAssembler accessCardClaimApplicationAssembler) {
        this.accessCardClaimApplicationAssembler = accessCardClaimApplicationAssembler;
    }

    /**
     * 查询本人待领签申请明细，支持内存分页。
     *
     * @param current  当前页码，默认 1
     * @param pageSize 每页条数，默认 3
     * @return 待领签申请明细分页响应
     */
    public AccessCardClaimApplicationPageResponse list(int current, int pageSize) {
        int resolvedCurrent = current < 1 ? DEFAULT_CURRENT : current;
        int resolvedPageSize = pageSize < 1 ? DEFAULT_PAGE_SIZE : pageSize;

        int total = CLAIM_APPLICATIONS.size();
        long fromIndex = (long) (resolvedCurrent - 1) * resolvedPageSize;
        List<AccessCardClaimApplication> pageData;
        if (fromIndex >= total) {
            pageData = Collections.emptyList();
        } else {
            long toIndex = Math.min(fromIndex + resolvedPageSize, total);
            pageData = new ArrayList<>(CLAIM_APPLICATIONS.subList((int) fromIndex, (int) toIndex));
        }

        List<AccessCardClaimApplicationItemResponse> list = pageData.stream()
                .map(accessCardClaimApplicationAssembler::toItemResponse)
                .collect(Collectors.toList());

        return accessCardClaimApplicationAssembler.toPageResponse(
                resolvedCurrent, resolvedPageSize, total, list);
    }

    /**
     * 完成领签：将勾选或全选的申请明细领签状态由待领签更新为已领签，
     * 本次契约无物理数据源与外部 API 绑定，按确认的静态数据返回更新结果。
     *
     * @param request 完成领签请求，携带需要完成领签的申请明细标识集合
     * @return 完成领签结果响应
     */
    public CompleteClaimResult completeClaim(CompleteClaimRequest request) {
        Integer updatedCount = STATIC_UPDATED_COUNT;
        List<String> updatedApplicationIds = new ArrayList<>(STATIC_UPDATED_APPLICATION_IDS);

        return accessCardClaimApplicationAssembler.toCompleteClaimResult(
                updatedApplicationIds, updatedCount);
    }

}
