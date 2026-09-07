// Витрина темы: каркас и компоненты в новом оформлении.
// Временный стенд для визуальной сверки с прототипом и Playwright-ассертов;
// в сборку приложения не входит (отдельная точка входа /stand/index.html).
import {
  App as AntdApp,
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Input,
  Modal,
  Segmented,
  Select,
  Slider,
  Steps,
  Table,
  Tabs,
  Tag,
  Typography,
  notification,
} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { LogoCube } from '@/components/brand/LogoCube';
import { Pill } from '@/components/Pill';
import { Plot } from '@/components/Plot';
import { ProcessGraph } from '@/components/ProcessGraph';
import { CHART, PLOT_BASE, SCALE_DURATION, SCALE_FREQUENCY } from '@/styles/chartTheme';
import '@/styles/fonts.css';
import '@/styles/tokens.css';
import '@/styles/shell.css';
import '@/styles/components.css';
import '@/styles/antd-overrides.css';
import { antdTheme } from '@/styles/theme';

const rows = [
  { key: 1, op: 'Регистрация', cases: 1328, dur: '2ч 14м', status: 'Готов' },
  { key: 2, op: 'Рассмотрение', cases: 1204, dur: '1д 3ч', status: 'Обработка' },
  { key: 3, op: 'Согласование', cases: 986, dur: '3д 8ч', status: 'Ошибка' },
];

function Stand() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="app" data-sidebar="expanded">
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-brand-logo">
            <LogoCube size={30} />
          </div>
          <div className="sb-brand-text">
            <span className="sb-brand-title">Process Mining</span>
            <span className="sb-brand-sub">Аналитика процессов</span>
          </div>
        </div>
        <nav className="sb-nav">
          <div className="sb-section-label">Основное</div>
          <button type="button" className="sb-item" aria-current="page">
            <span className="anticon" aria-hidden />
            <span>Проекты</span>
          </button>
          <button type="button" className="sb-item">
            <span className="anticon" aria-hidden />
            <span>Профиль</span>
          </button>
          <div className="sb-section-label">Администрирование</div>
          <button type="button" className="sb-item">
            <span className="anticon" aria-hidden />
            <span>Пользователи</span>
          </button>
        </nav>
        <div className="sb-footer">
          <button type="button" className="sb-collapse">
            <span>Свернуть меню</span>
          </button>
        </div>
      </aside>

      <header className="header">
        <div className="hdr-section-title">
          <span className="crumb-root">Process Mining</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Витрина темы</span>
        </div>
        <div className="hdr-spacer" />
        <button type="button" className="hdr-avatar">
          <span className="hdr-avatar-circle">ВК</span>
          <span className="hdr-avatar-name">Витрина Компонентов</span>
        </button>
      </header>

      <main className="main">
        <div className="page-head">
          <div>
            <h1>Заголовок страницы</h1>
            <div className="page-sub">Подзаголовок с пояснением раздела</div>
          </div>
          <div className="page-head-actions">
            <Button>Вторичная</Button>
            <Button type="primary" id="btn-primary">
              Основная
            </Button>
          </div>
        </div>

        <div className="tabs">
          <button type="button" aria-selected="true">
            Первая
          </button>
          <button type="button">Вторая</button>
          <button type="button">Третья</button>
        </div>

        <Card className="card" size="small" title="Карточка виджета" style={{ marginBottom: 16 }}>
          <div className="gpc-kpi">1 328</div>
          <div className="gpc-kpi-sub">экземпляров процесса</div>
        </Card>

        <Card className="card" title="Таблица" style={{ marginBottom: 16 }}>
          <Table
            size="small"
            pagination={false}
            dataSource={rows}
            columns={[
              { title: 'Операция', dataIndex: 'op' },
              { title: 'Экземпляров', dataIndex: 'cases', align: 'right' },
              { title: 'Длительность', dataIndex: 'dur' },
              { title: 'Статус', dataIndex: 'status' },
            ]}
          />
        </Card>

        <Card className="card" title="Контролы" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="link">Link</Button>
            <Button danger>Danger</Button>
            <Button size="small">Small</Button>
            <Input placeholder="Поле ввода" style={{ width: 180 }} />
            <Select placeholder="Выбор" style={{ width: 160 }} options={[{ value: 'a', label: 'Вариант' }]} />
            <DatePicker />
            <Segmented options={['Сырые', 'Роли']} />
            <Slider style={{ width: 160 }} defaultValue={40} />
            <Button onClick={() => setModalOpen(true)}>Модалка</Button>
            <Button onClick={() => notification.info({ message: 'Уведомление', description: 'Тема наследуется' })}>
              Уведомление
            </Button>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }} id="pills">
            <Pill tone="green">Готов</Pill>
            <Pill tone="yellow">Обработка</Pill>
            <Pill tone="orange">Предупреждения</Pill>
            <Pill tone="red">Ошибка</Pill>
            <Pill tone="blue">Информация</Pill>
            <Pill tone="gray">Нет правила</Pill>
            <Tag>Счётчик antd</Tag>
          </div>
          <div style={{ marginTop: 16 }}>
            <Steps
              size="small"
              current={1}
              items={[{ title: 'Файл' }, { title: 'Сопоставление' }, { title: 'Загрузка' }]}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <Tabs
              items={[
                { key: '1', label: 'Вкладка antd', children: 'Содержимое' },
                { key: '2', label: 'Вторая', children: 'Ещё' },
              ]}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <Typography.Title level={1}>Заголовок 1</Typography.Title>
            <Typography.Title level={3}>Заголовок 3</Typography.Title>
            <Typography.Title level={4}>Заголовок 4</Typography.Title>
            <Typography.Text type="secondary">Вторичный текст</Typography.Text>
          </div>
        </Card>

        <Card className="card" title="Графики" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Plot
              data={[
                { type: 'bar', x: ['Янв', 'Фев', 'Мар', 'Апр'], y: [120, 180, 140, 210], name: 'Операции' },
                {
                  type: 'scatter',
                  mode: 'lines+markers',
                  x: ['Янв', 'Фев', 'Мар', 'Апр'],
                  y: [90, 130, 100, 170],
                  name: 'Длительность',
                  line: { color: CHART.secondary },
                },
              ]}
              layout={{ ...PLOT_BASE, height: 240, margin: { l: 40, r: 16, t: 16, b: 32 }, showlegend: true }}
              config={{ displayModeBar: false }}
              style={{ width: '100%' }}
            />
            <Plot
              data={[
                {
                  type: 'heatmap',
                  x: ['Отдел А', 'Отдел Б', 'Отдел В'],
                  y: ['Регистрация', 'Согласование', 'Подписание'],
                  z: [
                    [3, 8, 5],
                    [12, 4, 9],
                    [6, 15, 2],
                  ],
                  colorscale: SCALE_DURATION,
                },
              ]}
              layout={{ ...PLOT_BASE, height: 240, margin: { l: 100, r: 16, t: 16, b: 32 } }}
              config={{ displayModeBar: false }}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <ProcessGraph
              height={320}
              nodes={[
                { data: { id: '__start__', kind: 'start', label: '', count: 100 } },
                { data: { id: 'n1', kind: 'operation', label: 'Регистрация', count: 100 } },
                { data: { id: 'n2', kind: 'operation', label: 'Согласование', count: 86 } },
                { data: { id: '__end__', kind: 'end', label: '', count: 80 } },
              ]}
              edges={[
                { data: { id: 'e0', source: '__start__', target: 'n1', count: 100 } },
                { data: { id: 'e1', source: 'n1', target: 'n2', count: 86 } },
                { data: { id: 'e2', source: 'n2', target: '__end__', count: 80 } },
              ]}
              highlight={{ nodeIds: ['n2'], edgeKeys: ['e1'] }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--gpc-gray-500)' }}>
            Шкала частот: {SCALE_FREQUENCY.map(([, c]) => c).join(' → ')}
          </div>
        </Card>

        <Modal open={modalOpen} onCancel={() => setModalOpen(false)} title="Заголовок модалки">
          Содержимое модального окна.
        </Modal>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={ruRU} theme={antdTheme}>
    <AntdApp>
      <Stand />
    </AntdApp>
  </ConfigProvider>
);
