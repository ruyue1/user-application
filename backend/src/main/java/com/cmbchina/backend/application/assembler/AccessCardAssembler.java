package com.cmbchina.backend.application.assembler;

import com.cmbchina.backend.application.dto.AccessCardDeactivationResponse;
import com.cmbchina.backend.application.dto.AccessCardItemResponse;
import com.cmbchina.backend.application.dto.AccessCardPageResponse;
import com.cmbchina.backend.domain.entity.AccessCard;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 门禁卡模块的 DTO 转换装配组件。
 */
@Component
public class AccessCardAssembler {

    /**
     * 将门禁卡领域实体转换为门禁卡列表元素响应，字段一一直接映射，
     * 未发起注销时 deactivationApplication 为空。
     *
     * @param card 门禁卡领域实体
     * @return 门禁卡列表元素响应
     */
    public AccessCardItemResponse toItemResponse(AccessCard card) {
        if (card == null) {
            return null;
        }
        AccessCardItemResponse response = new AccessCardItemResponse();
        response.setId(card.getId());
        response.setEmployeeName(card.getEmployeeName());
        response.setEmployeeNo(card.getEmployeeNo());
        response.setCardNo(card.getCardNo());
        response.setPermissionStatus(card.getPermissionStatus());
        response.setDeactivationApplication(card.getDeactivationApplication());
        return response;
    }

    /**
     * 将门禁卡领域实体转换为离职注销申请响应，字段一一直接映射。
     * 源字段缺失视为错误，不以空值静默填充。
     *
     * @param card 门禁卡领域实体
     * @return 离职注销申请响应
     */
    public AccessCardDeactivationResponse toDeactivationResponse(AccessCard card) {
        if (card == null) {
            throw new IllegalArgumentException("门禁卡领域实体不能为空");
        }
        AccessCardDeactivationResponse response = new AccessCardDeactivationResponse();
        response.setId(requireString(card.getId(), "id"));
        response.setEmployeeName(requireString(card.getEmployeeName(), "employeeName"));
        response.setEmployeeNo(requireString(card.getEmployeeNo(), "employeeNo"));
        response.setCardNo(requireString(card.getCardNo(), "cardNo"));
        response.setPermissionStatus(requireString(card.getPermissionStatus(), "permissionStatus"));
        response.setDeactivationApplication(
                requireString(card.getDeactivationApplication(), "deactivationApplication"));
        return response;
    }

    /**
     * 读取必填字符串字段，字段缺失或为空时抛出异常。
     *
     * @param value 字段值
     * @param key   字段键
     * @return 字段值
     */
    private String requireString(String value, String key) {
        if (value == null) {
            throw new IllegalArgumentException("门禁卡记录字段为空：" + key);
        }
        return value;
    }

    /**
     * 组装门禁卡分页响应，分页元信息按契约直接赋值，卡片列表逐项转换。
     * 总数超出 integer 范围时按契约 integer 类型收敛取值。
     *
     * @param cards    当前页门禁卡领域实体列表
     * @param total    符合条件门禁卡总数
     * @param current  当前页码
     * @param pageSize 每页记录数
     * @return 门禁卡分页响应
     */
    public AccessCardPageResponse toPageResponse(List<AccessCard> cards, long total,
                                                 Integer current, Integer pageSize) {
        List<AccessCardItemResponse> list;
        if (cards == null || cards.isEmpty()) {
            list = Collections.emptyList();
        } else {
            list = new ArrayList<>(cards.size());
            for (AccessCard card : cards) {
                list.add(toItemResponse(card));
            }
        }

        AccessCardPageResponse response = new AccessCardPageResponse();
        response.setTotal((int) Math.min(total, Integer.MAX_VALUE));
        response.setPageSize(pageSize);
        response.setCurrent(current);
        response.setList(list);
        return response;
    }

}
