import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { getErrorMessage, notifyError } from './lib/notify';
import { AppRouter } from './router';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/shell.css';
import './styles/components.css';
import './styles/antd-overrides.css';
import { antdTheme } from './styles/theme';

dayjs.locale('ru');

// Статические notification/message/Modal.confirm живут вне React-дерева
// (их зовёт QueryCache.onError ещё до рендера), поэтому тему им задаём
// глобально — иначе они рисуются дефолтным синим antd.
ConfigProvider.config({
  theme: antdTheme,
  holderRender: (children) => (
    <ConfigProvider locale={ruRU} theme={antdTheme}>
      {children}
    </ConfigProvider>
  ),
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => notifyError(getErrorMessage(error, 'Ошибка загрузки данных')),
  }),
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU} theme={antdTheme}>
      <AntdApp>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </QueryClientProvider>
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
);
