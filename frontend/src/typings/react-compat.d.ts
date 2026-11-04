/**
 * React 类型兼容补丁
 *
 * 背景：
 * @ant-design/icons 5.0.x 的 .d.ts 在生成图标组件类型时，把
 * onPointerEnterCapture / onPointerLeaveCapture 声明进了图标组件的 Props
 * （该属性来自 React 19 的类型定义）。而本项目使用 @types/react 18.x，
 * 其中并不包含这两个属性，导致 TypeScript 认为图标组件要求传入
 * 这两个必填属性，所有 <XxxOutlined /> 用法都会报 TS2739。
 *
 * 处理：
 * 在 React.DOMAttributes 上补充这两个可选的指针事件属性，
 * 使图标组件的 Props 类型重新变为可选，从而不影响任何运行时行为。
 */
import type { PointerEventHandler } from 'react';

declare module 'react' {
  interface DOMAttributes<T> {
    onPointerEnterCapture?: PointerEventHandler<T>;
    onPointerLeaveCapture?: PointerEventHandler<T>;
  }
}
