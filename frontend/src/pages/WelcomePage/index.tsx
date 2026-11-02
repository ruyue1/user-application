import { ProCard } from '@ant-design/pro-components';

export default function WelcomePage() {
  return (
    <ProCard
      bordered
      bodyStyle={{
        minHeight: 240,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 24, fontWeight: 500 }}>hello world</span>
    </ProCard>
  );
}
