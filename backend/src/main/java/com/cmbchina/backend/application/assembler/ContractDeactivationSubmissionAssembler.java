package com.cmbchina.backend.application.assembler;

import com.cmbchina.backend.application.dto.AccessCardItemResponse;
import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.application.dto.DeactivationSubmissionResult;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 合同注销提交模块的 DTO 转换装配组件。
 */
@Component
public class ContractDeactivationSubmissionAssembler {

    /**
     * 静态数据记录中的门禁卡主键键
     */
    private static final String KEY_ID = "id";

    /**
     * 静态数据记录中的员工姓名键
     */
    private static final String KEY_EMPLOYEE_NAME = "employeeName";

    /**
     * 静态数据记录中的员工编号键
     */
    private static final String KEY_EMPLOYEE_NO = "employeeNo";

    /**
     * 静态数据记录中的门禁卡卡号键
     */
    private static final String KEY_CARD_NO = "cardNo";

    /**
     * 静态数据记录中的门禁卡权限状态键
     */
    private static final String KEY_PERMISSION_STATUS = "permissionStatus";

    /**
     * 提交来源数据中的提交结果主键键
     */
    private static final String KEY_SUBMISSION_ID = "id";

    /**
     * 提交来源数据中的门禁卡主键键
     */
    private static final String KEY_CARD_ID = "cardId";

    /**
     * 提交来源数据中的申请注销状态键
     */
    private static final String KEY_DEACTIVATION_APPLY = "deactivationApply";

    /**
     * 提交来源数据中的同步状态键
     */
    private static final String KEY_SYNC_STATUS = "syncStatus";

    /**
     * 提交来源数据中的注销流程状态键
     */
    private static final String KEY_PROCESS_STATUS = "processStatus";

    /**
     * 提交来源数据中的提交时间键
     */
    private static final String KEY_SUBMITTED_AT = "submittedAt";

    /**
     * 组装本人使用中门禁卡分页响应。
     *
     * @param list     当前页门禁卡列表
     * @param current  当前页码
     * @param pageSize 每页条数
     * @param total    记录总数
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse toAccessCardPageResponse(
            List<AccessCardItemResponse> list, int current, int pageSize, long total) {
        AccessCardPageResponse response = new AccessCardPageResponse();
        response.setCurrent(current);
        response.setPageSize(pageSize);
        response.setTotal((int) Math.min(total, Integer.MAX_VALUE));
        response.setList(list);
        return response;
    }

    /**
     * 组装本人使用中门禁卡分页响应，源列表项逐项转换为列表元素响应。
     * 分页计算与业务决策由应用服务负责，此处仅做值装配。
     *
     * @param current  当前页码
     * @param pageSize 每页条数
     * @param total    记录总数
     * @param items    当前页门禁卡静态数据记录
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse toAccessCardPageResponse(
            int current, int pageSize, long total, List<Map<String, Object>> items) {
        List<AccessCardItemResponse> list;
        if (items == null || items.isEmpty()) {
            list = Collections.emptyList();
        } else {
            list = new ArrayList<>(items.size());
            for (Map<String, Object> item : items) {
                list.add(toAccessCardItemResponse(item));
            }
        }

        AccessCardPageResponse response = new AccessCardPageResponse();
        response.setTotal((int) Math.min(total, Integer.MAX_VALUE));
        response.setPageSize(pageSize);
        response.setCurrent(current);
        response.setList(list);
        return response;
    }

    /**
     * 将静态数据记录转换为门禁卡列表元素响应，字段一一直接映射。
     * 源字段缺失视为错误，不以空值静默填充。
     *
     * @param record 静态数据记录
     * @return 门禁卡列表元素响应
     */
    public AccessCardItemResponse toAccessCardItemResponse(Map<String, Object> record) {
        if (record == null) {
            throw new IllegalArgumentException("门禁卡静态数据记录不能为空");
        }
        AccessCardItemResponse response = new AccessCardItemResponse();
        response.setId(requireString(record, KEY_ID));
        response.setEmployeeName(requireString(record, KEY_EMPLOYEE_NAME));
        response.setEmployeeNo(requireString(record, KEY_EMPLOYEE_NO));
        response.setCardNo(requireString(record, KEY_CARD_NO));
        response.setPermissionStatus(requireString(record, KEY_PERMISSION_STATUS));
        return response;
    }

    /**
     * 将提交来源数据映射为离职注销申请提交结果响应。
     * 各字段与来源同名字段直接映射，不做类型转换；仅做值装配，不做存在性与状态校验。
     *
     * @param source 提交来源数据
     * @return 离职注销申请提交结果响应
     */
    public DeactivationSubmissionResult toDeactivationSubmissionResult(Map<String, Object> source) {
        if (source == null) {
            throw new IllegalArgumentException("离职注销申请提交来源数据不能为空");
        }
        DeactivationSubmissionResult result = new DeactivationSubmissionResult();
        result.setId(requireString(source, KEY_SUBMISSION_ID));
        result.setCardId(requireString(source, KEY_CARD_ID));
        result.setEmployeeName(requireString(source, KEY_EMPLOYEE_NAME));
        result.setEmployeeNo(requireString(source, KEY_EMPLOYEE_NO));
        result.setCardNo(requireString(source, KEY_CARD_NO));
        result.setDeactivationApply(requireString(source, KEY_DEACTIVATION_APPLY));
        result.setSyncStatus(requireString(source, KEY_SYNC_STATUS));
        result.setProcessStatus(requireString(source, KEY_PROCESS_STATUS));
        result.setSubmittedAt(requireString(source, KEY_SUBMITTED_AT));
        return result;
    }

    /**
     * 读取必填字符串字段，字段缺失或为空时抛出异常。
     *
     * @param record 静态数据记录
     * @param key    字段键
     * @return 字段值
     */
    private String requireString(Map<String, Object> record, String key) {
        if (!record.containsKey(key)) {
            throw new IllegalArgumentException("门禁卡静态数据记录缺少字段：" + key);
        }
        Object value = record.get(key);
        if (value == null) {
            throw new IllegalArgumentException("门禁卡静态数据记录字段为空：" + key);
        }
        return String.valueOf(value);
    }

}
