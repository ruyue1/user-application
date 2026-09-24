import { useState } from 'react';
import { useRequest } from 'ahooks';
import { ProCard, ProForm, ProFormDigit } from '@ant-design/pro-components';
import { Alert, Typography, message } from 'antd';
import {
  AGE_ENTRY_ERROR_CODES,
  createAgeEntry,
  type AgeEntryCreateInput,
} from '@/apis/ageEntryApi';

/** 页面本地即时校验区间：仅接受 0-150 的整数年龄。 */
const AGE_MIN = 0;
const AGE_MAX = 150;

/** 非法年龄的统一提示文案。 */
const INVALID_AGE_HINT = `请输入 ${AGE_MIN}-${AGE_MAX} 之间的整数年龄。`;

/**
 * 接口业务错误码 → 用户可读提示。
 * 错误码取自 api 契约 age_entry_api.create：VALIDATION_ERROR / INTERNAL_ERROR。
 */
const ERROR_CODE_MESSAGES: Record<string, string> = {
  [AGE_ENTRY_ERROR_CODES.validation]: INVALID_AGE_HINT,
  [AGE_ENTRY_ERROR_CODES.internal]: '服务暂时不可用，请稍后重试。',
};

const DEFAULT_ERROR_MESSAGE = '年龄录入失败，请稍后重试。';

/** 从异常中读取后端业务返回码（service 抛出的业务异常携带 returnCode）。 */
function readReturnCode(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'returnCode' in error) {
    const code = (error as { returnCode?: unknown }).returnCode;
    if (typeof code === 'string') return code;
  }
  return '';
}

/** 将提交失败原因转换为页面提示文案。 */
function resolveErrorMessage(error: unknown): string {
  const code = readReturnCode(error);
  if (code && ERROR_CODE_MESSAGES[code]) return ERROR_CODE_MESSAGES[code];
  if (error instanceof Error && error.message) return error.message;
  return DEFAULT_ERROR_MESSAGE;
}

interface Feedback {
  type: 'success' | 'error';
  text: string;
}

export default function AgeEntryHome() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  /**
   * 通过共享业务接口模块提交年龄：
   * action age_entry_home_submit_age → endpoint age_entry_api.create（POST /api/age-entry）。
   */
  const { runAsync, loading } = useRequest(createAgeEntry, { manual: true });

  const handleFinish = async (values: AgeEntryCreateInput) => {
    const age = Number(values?.age);
    if (!Number.isInteger(age) || age < AGE_MIN || age > AGE_MAX) {
      // 校验不通过时不发起保存请求
      setFeedback({ type: 'error', text: INVALID_AGE_HINT });
      message.error(INVALID_AGE_HINT);
      return;
    }
    setFeedback(null);
    try {
      const result = await runAsync({ age });
      const text = result?.message || '年龄录入成功。';
      setFeedback({ type: 'success', text });
      message.success(text);
    } catch (error) {
      const text = resolveErrorMessage(error);
      setFeedback({ type: 'error', text });
      message.error(text);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <ProCard
        title="年龄录入"
        subTitle="填写年龄后提交，系统将保存本次录入的年龄数据。"
        headerBordered
      >
        <div style={{ maxWidth: 480 }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
            年龄为必填项，请输入 {AGE_MIN}-{AGE_MAX} 之间的整数。
          </Typography.Paragraph>
          {feedback ? (
            <Alert
              style={{ marginBottom: 16 }}
              type={feedback.type}
              showIcon
              message={feedback.text}
            />
          ) : null}
          <ProForm<AgeEntryCreateInput>
            submitter={{
              searchConfig: { submitText: '提交年龄' },
              resetButtonProps: false,
              submitButtonProps: { loading, disabled: loading },
            }}
            onFinish={handleFinish}
          >
            <ProFormDigit
              name="age"
              label="年龄"
              placeholder="请输入年龄"
              width="sm"
              min={AGE_MIN}
              max={AGE_MAX}
              fieldProps={{ precision: 0, addonAfter: '岁' }}
              rules={[
                { required: true, message: '请输入年龄' },
                { type: 'integer', message: '年龄必须为整数' },
                {
                  type: 'number',
                  min: AGE_MIN,
                  max: AGE_MAX,
                  message: INVALID_AGE_HINT,
                },
              ]}
            />
          </ProForm>
        </div>
      </ProCard>
    </div>
  );
}
