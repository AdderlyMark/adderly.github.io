import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Этот хук нужно вызвать один раз в App.tsx или Navbar
export const useAnalytics = () => {
  const location = useLocation();

  // 1. Отслеживание просмотров страниц
  useEffect(() => {
    const pagePath = location.pathname;
    // TODO: В будущем здесь будет вызов API:
    // await api.sendMetric({ type: 'pageview', path: pagePath });
    console.log(`[Analytics] Page View: ${pagePath}`);
  }, [location]);
};

// 2. Функция для отслеживания кликов (экспортируем отдельно)
export const trackEvent = (eventName: string, data?: any) => {
  // TODO: В будущем здесь будет вызов API
  console.log(`[Analytics] Event: ${eventName}`, data);
};