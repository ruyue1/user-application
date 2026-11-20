package com.cmbchina.backend.modules.accesscard.application.service;

import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.modules.accesscard.application.assembler.AccessCardAssembler;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardApplicationPageResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.AccessCardResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.CancelAccessCardRequest;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimItemResponse;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimRequest;
import com.cmbchina.backend.modules.accesscard.application.dto.CompleteClaimResponse;
import com.cmbchina.backend.modules.accesscard.domain.entity.AccessCard;
import com.cmbchina.backend.modules.accesscard.domain.exception.AccessCardApplicationErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 门禁卡申请应用服务。
 *
 * <p>数据来源为 sourceBinding=static 的固定数据，直接按领签人本人与「待领签」状态筛选后
 * 在内存中分页组装响应，不访问数据库、缓存或外部 API。</p>
 */
@Service
public class AccessCardApplicationService {

    /**
     * 领签状态：待领签
     */
    private static final String CLAIM_STATUS_PENDING = "待领签";

    /**
     * 领签状态：已领签
     */
    private static final String CLAIM_STATUS_CLAIMED = "已领签";

    /**
     * 权限状态：使用中
     */
    private static final String PERMISSION_STATUS_IN_USE = "使用中";

    /**
     * 权限状态：已注销
     */
    private static final String PERMISSION_STATUS_CANCELLED = "已注销";

    /**
     * 注销申请状态：离职
     */
    private static final String CANCELLATION_APPLICATION_RESIGNED = "离职";

    /**
     * 注销申请状态：无
     */
    private static final String CANCELLATION_APPLICATION_NONE = "无";

    /**
     * 门禁卡记录静态数据，按持卡人ID归属
     */
    private static final List<StaticAccessCard> STATIC_ACCESS_CARDS = Arrays.asList(
            new StaticAccessCard("1", "holder-001", "张三", "12345678", "8888888",
                    PERMISSION_STATUS_IN_USE, CANCELLATION_APPLICATION_NONE),
            new StaticAccessCard("2", "holder-001", "李四", "12345679", "8888889",
                    PERMISSION_STATUS_CANCELLED, CANCELLATION_APPLICATION_RESIGNED),
            new StaticAccessCard("3", "holder-001", "王五", "12345680", "8888890",
                    PERMISSION_STATUS_IN_USE, CANCELLATION_APPLICATION_NONE),
            new StaticAccessCard("4", "holder-002", "赵六", "12345681", "8888891",
                    PERMISSION_STATUS_IN_USE, CANCELLATION_APPLICATION_NONE),
            new StaticAccessCard("5", "holder-002", "钱七", "12345682", "8888892",
                    PERMISSION_STATUS_CANCELLED, CANCELLATION_APPLICATION_RESIGNED),
            new StaticAccessCard("6", "holder-003", "孙八", "12345683", "8888893",
                    PERMISSION_STATUS_IN_USE, CANCELLATION_APPLICATION_NONE));

    private final AccessCardAssembler accessCardAssembler;

    @Autowired
    public AccessCardApplicationService(AccessCardAssembler accessCardAssembler) {
        this.accessCardAssembler = accessCardAssembler;
    }

    /**
     * 门禁卡申请明细静态数据，按领签人ID归属
     */
    private static final List<StaticAccessCardApplication> STATIC_APPLICATIONS = Arrays.asList(
            new StaticAccessCardApplication("1", "claimer-001", "张三", "12345678", "8888888", CLAIM_STATUS_PENDING),
            new StaticAccessCardApplication("2", "claimer-001", "李四", "12345679", "8888889", CLAIM_STATUS_CLAIMED),
            new StaticAccessCardApplication("3", "claimer-001", "王五", "12345680", "8888890", CLAIM_STATUS_PENDING),
            new StaticAccessCardApplication("4", "claimer-002", "赵六", "12345681", "8888891", CLAIM_STATUS_PENDING),
            new StaticAccessCardApplication("5", "claimer-002", "钱七", "12345682", "8888892", CLAIM_STATUS_CLAIMED),
            new StaticAccessCardApplication("6", "claimer-003", "孙八", "12345683", "8888893", CLAIM_STATUS_PENDING));

    /**
     * 获取本人待领签门禁卡申请明细分页结果。
     *
     * @param claimerId 招乎扫码识别出的扫码人ID，用于匹配领签人字段
     * @param current   当前页码，从 1 开始
     * @param pageSize  每页记录数
     * @return 本人待领签申请明细分页结果
     */
    public AccessCardApplicationPageResponse listAccessCardApplications(String claimerId, Integer current,
                                                                       Integer pageSize) {
        if (claimerId == null || claimerId.trim().isEmpty()
                || current == null || current < 1
                || pageSize == null || pageSize < 1) {
            throw new BizException(AccessCardApplicationErrorCode.INVALID_PARAMETER);
        }

        List<StaticAccessCardApplication> matched = STATIC_APPLICATIONS.stream()
                .filter(application -> claimerId.equals(application.getClaimerId()))
                .filter(application -> CLAIM_STATUS_PENDING.equals(application.getClaimStatus()))
                .collect(Collectors.toList());

        int total = matched.size();
        long offset = (long) (current - 1) * pageSize;
        List<AccessCardApplicationPageResponse.AccessCardApplicationItem> list = new ArrayList<>();
        if (offset < total) {
            int fromIndex = (int) offset;
            int toIndex = Math.min(fromIndex + pageSize, total);
            list = matched.subList(fromIndex, toIndex).stream()
                    .map(application -> new AccessCardApplicationPageResponse.AccessCardApplicationItem(
                            application.getId(),
                            application.getName(),
                            application.getEmployeeNo(),
                            application.getCardNo(),
                            application.getClaimStatus()))
                    .collect(Collectors.toList());
        }

        return new AccessCardApplicationPageResponse(total, pageSize, current, list);
    }

    /**
     * 获取本人使用中门禁卡分页列表。
     *
     * @param current  当前页码，从 1 开始
     * @param pageSize 每页记录数
     * @return 本人使用中门禁卡分页结果
     */
    public AccessCardPageResponse listAccessCards(Integer current, Integer pageSize) {
        List<StaticAccessCard> matched = STATIC_ACCESS_CARDS.stream()
                .filter(card -> PERMISSION_STATUS_IN_USE.equals(card.getPermissionStatus()))
                .collect(Collectors.toList());

        long total = matched.size();
        long offset = (long) (current - 1) * pageSize;
        List<AccessCard> pageCards = new ArrayList<>();
        if (offset < total) {
            int fromIndex = (int) offset;
            int toIndex = (int) Math.min(fromIndex + pageSize, total);
            pageCards = matched.subList(fromIndex, toIndex).stream()
                    .map(card -> new AccessCard(card.getId(), card.getName(), card.getEmployeeNo(),
                            card.getCardNo(), card.getPermissionStatus(), card.getCancellationApplication()))
                    .collect(Collectors.toList());
        }

        return accessCardAssembler.toPageResponse(pageCards, total, current, pageSize);
    }

    /**
     * 完成领签，将已勾选申请明细的领签状态由「待领签」更新为「已领签」，返回更新后的明细。
     *
     * <p>数据来源为固定静态数据，更新结果仅在内存中基于本次请求明细组装，不访问数据库、缓存或外部 API。</p>
     *
     * @param request 完成领签请求，承载本次领签的申请明细记录 id 集合
     * @return 完成领签响应，包含本次更新为「已领签」的明细条数与更新后的明细列表
     */
    public CompleteClaimResponse completeClaim(CompleteClaimRequest request) {
        List<String> ids = request == null ? null : request.getIds();
        if (ids == null || ids.isEmpty()) {
            throw new BizException(AccessCardApplicationErrorCode.INVALID_PARAMETER);
        }

        Set<String> targetIds = new HashSet<>(ids);
        List<CompleteClaimItemResponse> items = STATIC_APPLICATIONS.stream()
                .filter(application -> targetIds.contains(application.getId()))
                .map(application -> new CompleteClaimItemResponse(
                        application.getId(),
                        application.getName(),
                        application.getEmployeeNo(),
                        application.getCardNo(),
                        CLAIM_STATUS_CLAIMED))
                .collect(Collectors.toList());

        return accessCardAssembler.toCompleteClaimResponse(items.size(), items);
    }

    /**
     * 发起离职注销申请，将权限状态为「使用中」的门禁卡注销申请状态置为「离职」，返回更新后的门禁卡信息。
     *
     * <p>数据来源为固定静态数据，注销申请结果仅在内存中基于本次请求组装，不访问数据库、缓存或外部 API；
     * 飞码端注销流程同步沿用其既有能力，本服务不额外编排外部调用。</p>
     *
     * @param request 发起离职注销申请请求，承载需要发起注销的门禁卡记录标识
     * @return 更新后的门禁卡信息
     */
    public AccessCardResponse applyCancellation(CancelAccessCardRequest request) {
        String accessCardId = request == null ? null : request.getAccessCardId();
        if (accessCardId == null || accessCardId.trim().isEmpty()) {
            throw new BizException(AccessCardApplicationErrorCode.INVALID_PARAMETER);
        }

        StaticAccessCard matched = STATIC_ACCESS_CARDS.stream()
                .filter(card -> accessCardId.equals(card.getId()))
                .findFirst()
                .orElseThrow(() -> new BizException(AccessCardApplicationErrorCode.NOT_FOUND));

        if (!PERMISSION_STATUS_IN_USE.equals(matched.getPermissionStatus())) {
            throw new BizException(AccessCardApplicationErrorCode.INVALID_STATE);
        }

        AccessCard cancelled = new AccessCard(matched.getId(), matched.getName(), matched.getEmployeeNo(),
                matched.getCardNo(), matched.getPermissionStatus(), CANCELLATION_APPLICATION_RESIGNED);

        return accessCardAssembler.toAccessCardResponse(cancelled);
    }

    /**
     * 门禁卡静态数据载体，包含持卡人ID用于归属筛选。
     */
    @Getter
    @AllArgsConstructor
    private static class StaticAccessCard {

        /**
         * 门禁卡记录唯一标识
         */
        private final String id;

        /**
         * 持卡人ID
         */
        private final String holderId;

        /**
         * 持卡员工姓名
         */
        private final String name;

        /**
         * 持卡员工员工编号
         */
        private final String employeeNo;

        /**
         * 门禁卡卡号
         */
        private final String cardNo;

        /**
         * 门禁卡当前权限状态
         */
        private final String permissionStatus;

        /**
         * 注销申请状态
         */
        private final String cancellationApplication;

    }

    /**
     * 门禁卡申请明细静态数据载体，包含领签人ID用于归属筛选。
     */
    @Getter
    @AllArgsConstructor
    private static class StaticAccessCardApplication {

        /**
         * 申请明细唯一标识
         */
        private final String id;

        /**
         * 领签人ID
         */
        private final String claimerId;

        /**
         * 员工姓名
         */
        private final String name;

        /**
         * 员工工号
         */
        private final String employeeNo;

        /**
         * 门禁卡卡号
         */
        private final String cardNo;

        /**
         * 领签状态
         */
        private final String claimStatus;

    }

}
