package com.cmbchina.backend.application.service;

import com.cmbchina.backend.application.assembler.ContractDeactivationSubmissionAssembler;
import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.application.dto.DeactivationSubmissionRequest;
import com.cmbchina.backend.application.dto.DeactivationSubmissionResult;
import com.cmbchina.backend.common.exception.BizException;
import com.cmbchina.backend.domain.exception.ContractDeactivationSubmissionErrorCode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 合同注销提交模块应用服务，承载端点 contract_deactivation_submission.list
 * 与 contract_deactivation_submission.submit_deactivation 的业务实现。
 */
@Service
public class ContractDeactivationSubmissionService {

    private static final String KEY_ID = "id";

    private static final String KEY_EMPLOYEE_NAME = "employeeName";

    private static final String KEY_EMPLOYEE_NO = "employeeNo";

    private static final String KEY_CARD_NO = "cardNo";

    private static final String KEY_PERMISSION_STATUS = "permissionStatus";

    /**
     * 门禁卡权限状态：使用中
     */
    private static final String PERMISSION_STATUS_IN_USE = "使用中";

    /**
     * 静态数据源：离职注销申请提交结果主键。
     */
    private static final String STATIC_SUBMISSION_ID = "DS-20241121-001";

    /**
     * 静态数据源：申请注销状态，发起离职注销后固定为离职。
     */
    private static final String STATIC_DEACTIVATION_APPLY = "离职";

    /**
     * 静态数据源：同步状态，已同步至飞码端。
     */
    private static final String STATIC_SYNC_STATUS = "已同步";

    /**
     * 静态数据源：注销流程状态，由飞码触发后续注销流程，当前处于处理中。
     */
    private static final String STATIC_PROCESS_STATUS = "处理中";

    /**
     * 静态数据源：提交时间，按契约字符串原样返回。
     */
    private static final String STATIC_SUBMITTED_AT = "2026-11-21 10:30:00";

    /**
     * 静态数据源：本人名下使用中的门禁卡记录。
     */
    private static final List<Map<String, Object>> ACCESS_CARDS = Collections.unmodifiableList(
            buildAccessCards());

    /**
     * 静态数据源：离职注销申请提交结果记录，键名与契约字段映射保持一致。
     */
    private static final List<Map<String, Object>> SUBMISSIONS = Collections.unmodifiableList(
            buildSubmissions());

    private final ContractDeactivationSubmissionAssembler contractDeactivationSubmissionAssembler;

    public ContractDeactivationSubmissionService(
            ContractDeactivationSubmissionAssembler contractDeactivationSubmissionAssembler) {
        this.contractDeactivationSubmissionAssembler = contractDeactivationSubmissionAssembler;
    }

    /**
     * 查询本人使用中门禁卡，按 current/pageSize 对静态卡数据分页并直接映射各响应字段。
     *
     * @param current  当前页码，必填且不小于 1
     * @param pageSize 每页条数，必填且不小于 1
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse listAccessCards(Integer current, Integer pageSize) {
        if (current == null || current < 1 || pageSize == null || pageSize < 1) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.INVALID_PARAMETER);
        }

        int total = ACCESS_CARDS.size();
        long fromIndex = (long) (current - 1) * pageSize;
        List<Map<String, Object>> pageData;
        if (fromIndex >= total) {
            pageData = Collections.emptyList();
        } else {
            long toIndex = Math.min(fromIndex + pageSize, total);
            pageData = new ArrayList<>(ACCESS_CARDS.subList((int) fromIndex, (int) toIndex));
        }

        return contractDeactivationSubmissionAssembler.toAccessCardPageResponse(
                current, pageSize, total, pageData);
    }

    /**
     * 提交离职注销申请：校验目标门禁卡存在且权限状态为使用中，
     * 通过后按契约字段映射构造提交结果并交由装配器转换为响应。
     * 本端点无数据库写入与外部 API 绑定，不虚构同步与流程推进逻辑。
     *
     * @param request 提交离职注销申请请求，携带目标门禁卡主键
     * @return 离职注销申请提交结果响应
     */
    public DeactivationSubmissionResult submitDeactivation(DeactivationSubmissionRequest request) {
        if (request == null || request.getCardId() == null || request.getCardId().trim().isEmpty()) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.INVALID_PARAMETER);
        }

        Map<String, Object> accessCard = findAccessCard(request.getCardId().trim());
        if (accessCard == null) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.NOT_FOUND);
        }
        if (!PERMISSION_STATUS_IN_USE.equals(accessCard.get(KEY_PERMISSION_STATUS))) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.INVALID_STATE);
        }

        Map<String, Object> source = new LinkedHashMap<>();
        source.put("id", STATIC_SUBMISSION_ID);
        source.put("cardId", String.valueOf(accessCard.get(KEY_ID)));
        source.put(KEY_EMPLOYEE_NAME, String.valueOf(accessCard.get(KEY_EMPLOYEE_NAME)));
        source.put(KEY_EMPLOYEE_NO, String.valueOf(accessCard.get(KEY_EMPLOYEE_NO)));
        source.put(KEY_CARD_NO, String.valueOf(accessCard.get(KEY_CARD_NO)));
        source.put("deactivationApply", STATIC_DEACTIVATION_APPLY);
        source.put("syncStatus", STATIC_SYNC_STATUS);
        source.put("processStatus", STATIC_PROCESS_STATUS);
        source.put("submittedAt", STATIC_SUBMITTED_AT);

        return contractDeactivationSubmissionAssembler.toDeactivationSubmissionResult(source);
    }

    /**
     * 按提交结果主键查询离职注销申请提交结果详情。
     * 数据源为静态数据，各响应字段与静态数据同名字段一一直接映射，
     * 静态数据中不存在该主键时抛出 NOT_FOUND 业务异常。
     * 本端点不涉及数据库访问与外部 API 调用。
     *
     * @param id 离职注销申请提交结果主键
     * @return 离职注销申请提交结果详情
     */
    public DeactivationSubmissionResult getResult(String id) {
        Map<String, Object> submission = findSubmission(id);
        if (submission == null) {
            throw new BizException(ContractDeactivationSubmissionErrorCode.NOT_FOUND);
        }

        Map<String, Object> source = new LinkedHashMap<>();
        source.put("id", submission.get("id"));
        source.put("cardId", submission.get("cardId"));
        source.put(KEY_EMPLOYEE_NAME, submission.get(KEY_EMPLOYEE_NAME));
        source.put(KEY_EMPLOYEE_NO, submission.get(KEY_EMPLOYEE_NO));
        source.put(KEY_CARD_NO, submission.get(KEY_CARD_NO));
        source.put("deactivationApply", submission.get("deactivationApply"));
        source.put("syncStatus", submission.get("syncStatus"));
        source.put("processStatus", submission.get("processStatus"));
        source.put("submittedAt", submission.get("submittedAt"));

        return contractDeactivationSubmissionAssembler.toDeactivationSubmissionResult(source);
    }

    /**
     * 按提交结果主键查找静态提交结果记录。
     *
     * @param id 提交结果主键
     * @return 匹配的提交结果记录，未找到时返回 null
     */
    private Map<String, Object> findSubmission(String id) {
        if (id == null) {
            return null;
        }
        for (Map<String, Object> record : SUBMISSIONS) {
            if (id.equals(record.get(KEY_ID))) {
                return record;
            }
        }
        return null;
    }

    /**
     * 构建静态提交结果记录，键名与契约字段映射保持一致。
     *
     * @param id                提交结果主键
     * @param cardId            门禁卡主键
     * @param employeeName      员工姓名
     * @param employeeNo        员工编号
     * @param cardNo            门禁卡卡号
     * @param deactivationApply 申请注销状态
     * @param syncStatus        同步状态
     * @param processStatus     注销流程状态
     * @param submittedAt       提交时间
     * @return 静态提交结果记录
     */
    private static Map<String, Object> buildSubmission(String id, String cardId, String employeeName,
                                                       String employeeNo, String cardNo,
                                                       String deactivationApply, String syncStatus,
                                                       String processStatus, String submittedAt) {
        Map<String, Object> record = new LinkedHashMap<>();
        record.put(KEY_ID, id);
        record.put("cardId", cardId);
        record.put(KEY_EMPLOYEE_NAME, employeeName);
        record.put(KEY_EMPLOYEE_NO, employeeNo);
        record.put(KEY_CARD_NO, cardNo);
        record.put("deactivationApply", deactivationApply);
        record.put("syncStatus", syncStatus);
        record.put("processStatus", processStatus);
        record.put("submittedAt", submittedAt);
        return record;
    }

    /**
     * 按门禁卡主键查找静态门禁卡记录。
     *
     * @param cardId 门禁卡主键
     * @return 匹配的门禁卡记录，未找到时返回 null
     */
    private Map<String, Object> findAccessCard(String cardId) {
        for (Map<String, Object> record : ACCESS_CARDS) {
            if (cardId.equals(record.get(KEY_ID))) {
                return record;
            }
        }
        return null;
    }

    /**
     * 构建静态门禁卡记录，键名与契约字段映射保持一致。
     *
     * @return 静态门禁卡记录列表
     */
    private static List<Map<String, Object>> buildAccessCards() {
        List<Map<String, Object>> cards = new ArrayList<>();
        cards.add(buildRecord("AC-CARD-20240612-001", "林晓舟", "EMP10086", "CARD-8842015", "使用中"));
        cards.add(buildRecord("AC-CARD-20240612-002", "赵一鸣", "EMP10087", "CARD-8842016", "使用中"));
        cards.add(buildRecord("AC-CARD-20240612-003", "陈思远", "EMP10088", "CARD-8842017", "使用中"));
        return cards;
    }

    /**
     * 构建静态提交结果记录列表，与静态门禁卡数据保持一致。
     *
     * @return 静态提交结果记录列表
     */
    private static List<Map<String, Object>> buildSubmissions() {
        List<Map<String, Object>> submissions = new ArrayList<>();
        submissions.add(buildSubmission(STATIC_SUBMISSION_ID, "AC-CARD-20240612-001", "林晓舟",
                "EMP10086", "CARD-8842015", STATIC_DEACTIVATION_APPLY, STATIC_SYNC_STATUS,
                STATIC_PROCESS_STATUS, STATIC_SUBMITTED_AT));
        return submissions;
    }

    /**
     * 构建单条静态门禁卡记录。
     *
     * @param id               记录标识
     * @param employeeName     员工姓名
     * @param employeeNo       员工编号
     * @param cardNo           门禁卡卡号
     * @param permissionStatus 权限状态
     * @return 静态门禁卡记录
     */
    private static Map<String, Object> buildRecord(String id, String employeeName, String employeeNo,
                                                   String cardNo, String permissionStatus) {
        Map<String, Object> record = new LinkedHashMap<>();
        record.put(KEY_ID, id);
        record.put(KEY_EMPLOYEE_NAME, employeeName);
        record.put(KEY_EMPLOYEE_NO, employeeNo);
        record.put(KEY_CARD_NO, cardNo);
        record.put(KEY_PERMISSION_STATUS, permissionStatus);
        return record;
    }

}
