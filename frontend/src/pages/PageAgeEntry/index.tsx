import { useState } from 'react';
import { ProCard, ProForm, ProFormDigit } from '@ant-design/pro-components';
import { Alert, Typography } from 'antd';
import { useRequest } from 'ahooks';
import { submitAgeEntry } from '@/apis/ageEntryApi';
import type { AgeSubmitInput, AgeSubmitOutput } from '@/apis/ageEntryApi';

/**
 * 年龄录入页面（pageId: page_age_entry）。
 *
 * 页面只呈现一个年龄输入框与提交操作，不查询、不展示任何已录入的年龄数据；
 * 提交动作 page_age_entry_submit_age 唯一对应端点 age_entry_api.submit（POST /api/age-entry）。
 */

/** 年龄的合理取值范围。 */
const AGE_MIN = 1;
const AGE_MAX = 150;

const RANGE_MESSAGE = `年龄需为 ${AGE_MIN}-${AGE_MAX} 之间的整数`;

/** 端点 age_entry_api.submit 声明的错误码到用户可见提示的映射。 */
const ERROR_MESSAGE_MAP: Record<string, string> = {
  INVALID_AGE: `年龄数值无效，请填写 ${AGE_MIN}-${AGE_MAX} 之间的整数后重试`,
  INTERNAL_ERROR: '提交失败，服务暂时不可用，请稍后重试',
};

const DEFAULT_ERROR_MESSAGE = '提交失败，请稍后重试';
const SUCCESS_FALLBACK_MESSAGE = '年龄提交成功';

/** 提交结果反馈。 */
type FeedbackState = {
  type: 'success' | 'error';
  text: string;
};

/** 从错误对象中读取后端统一响应错误码，避免页面直接依赖请求封装实现。 */
const readReturnCode = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || error === null) return undefined;
  const code = (error as { returnCode?: unknown }).returnCode;
  return typeof code === 'string' ? code : undefined;
};

const resolveErrorMessage = (error: unknown): string => {
  const code = readReturnCode(error);
  return (code ? ERROR_MESSAGE_MAP[code] : undefined) ?? DEFAULT_ERROR_MESSAGE;
};

export default function PageAgeEntry() {
  /** 组件本地状态保存用户输入的年龄，提交失败时保留以便重试。 */
  const [ageValue, setAgeValue] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  /** 提交成功后递增，用于重置表单输入。 */
  const [formVersion, setFormVersion] = useState(0);

  const { loading, run } = useRequest(
    (payload: AgeSubmitInput) => submitAgeEntry(payload),
    {
      manual: true,
      onSuccess: (result: AgeSubmitOutput) => {
        const text = result?.message || SUCCESS_FALLBACK_MESSAGE;
        setFeedback({ type: 'success', text });
        setAgeValue(undefined);
        setFormVersion((version) => version + 1);
      },
      onError: (error: Error) => {
        setFeedback({ type: 'error', text: resolveErrorMessage(error) });
      },
    },
  );

  const handleFinish = async (values: Record<string, unknown>) => {
    if (loading) return;
    const rawAge = values?.age_value;
    // 优先使用表单值，回退到本地保存的输入值，保证失败重试时沿用用户已填内容。
    const submittedAge = typeof rawAge === 'number' ? rawAge : Number(ageValue);
    if (!Number.isInteger(submittedAge) || submittedAge < AGE_MIN || submittedAge > AGE_MAX) {
      setFeedback({ type: 'error', text: RANGE_MESSAGE });
      return;
    }
    setFeedback(null);
    const payload: AgeSubmitInput = { age_value: submittedAge };
    run(payload);
  };

  return (
    <div style={{ padding: 24 }}>
      <ProCard title="年龄录入" bordered headerBordered style={{ maxWidth: 560 }}>
        <Typography.Paragraph type="secondary">
          请填写年龄并提交，提交成功后系统仅保存该年龄数值，页面不展示已录入的年龄数据。
        </Typography.Paragraph>
        {feedback ? (
          <Alert
            showIcon
            style={{ marginBottom: 16 }}
            type={feedback.type}
            message={feedback.type === 'success' ? '提交成功' : '提交失败'}
            description={feedback.text}
          />
        ) : null}
        <ProForm
          key={formVersion}
          layout="vertical"
          onValuesChange={(_changed, allValues) => {
            const nextAge = allValues?.age_value;
            setAgeValue(typeof nextAge === 'number' ? nextAge : undefined);
          }}
          onFinish={handleFinish}
          submitter={{
            searchConfig: { submitText: '提交' },
            resetButtonProps: false,
            submitButtonProps: {
              loading,
              disabled: loading,
              size: 'large',
            },
          }}
        >
          <ProFormDigit
            name="age_value"
            label="年龄"
            placeholder="请输入年龄"
            rules={[
              { required: true, message: '请输入年龄' },
              { type: 'integer', message: '年龄必须为整数' },
              { type: 'number', min: AGE_MIN, max: AGE_MAX, message: RANGE_MESSAGE },
            ]}
            fieldProps={{ step: 1, style: { width: 240 } }}
          />
        </ProForm>
      </ProCard>
    </div>
  );
}
