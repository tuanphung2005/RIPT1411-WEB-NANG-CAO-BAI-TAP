import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Custom hooks có định kiểu chặt chẽ cho toàn bộ ứng dụng.
 * Tuyệt đối không dùng useDispatch và useSelector chưa định kiểu trực tiếp từ 'react-redux'.
 */
export const useAppDispatch: () => AppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector.withTypes<RootState>();
