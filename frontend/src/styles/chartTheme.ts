/** Палитра графиков и графа процесса — из тех же токенов, что и интерфейс.
 *
 * Plotly рисует в canvas, Cytoscape — в canvas и data-URI SVG; CSS-переменные
 * там недоступны, поэтому значения берутся из theme.ts. До редизайна здесь
 * жили дефолтные цвета antd (#1677ff, #fa8c16…), из-за чего на одном экране
 * встречались два разных синих: брендовый на кнопках и antd на барах.
 */
import type { Layout } from 'plotly.js';

import { tokens, withAlpha } from './theme';

/** Категориальные серии: минимум пять различимых цветов. */
export const SERIES = [
  tokens.blue,
  tokens.orange,
  tokens.cyan,
  tokens.blue800,
  tokens.peach,
  tokens.ok,
] as const;

export const CHART = {
  series: SERIES,
  primary: tokens.blue,
  secondary: tokens.orange,
  danger: tokens.err,
  muted: tokens.gray400,
  grid: tokens.gray150,
  axis: tokens.gray500,
  paper: tokens.white,
  font: {
    family: tokens.fontUi,
    size: 12,
    color: tokens.gray700,
  },
  /** Заливки под линиями и барами. */
  fill: (color: string, alpha = 0.2) => withAlpha(color, alpha),
} as const;

/** Последовательные шкалы теплокарт. Частоты — «холодная», длительности —
 * «тёплая»: у них разный смысл, одинаковая шкала путала при сравнении. */
export const SCALE_FREQUENCY: Array<[number, string]> = [
  [0, tokens.sky],
  [0.5, tokens.blue],
  [1, tokens.blue800],
];

export const SCALE_DURATION: Array<[number, string]> = [
  [0, tokens.peach],
  [0.5, tokens.orange],
  [1, tokens.orange700],
];

/** Граф процесса (Cytoscape). */
export const GRAPH = {
  nodeBg: tokens.white,
  nodeBorder: tokens.gray200,
  nodeText: tokens.gray800,
  edge: tokens.gray300,
  edgeLabel: tokens.gray500,
  edgeLabelBg: tokens.white,
  terminal: tokens.blue,
  terminalText: tokens.white,
  highlight: tokens.orange,
  badgeFill: tokens.gray50,
  badgeStroke: tokens.gray150,
  badgeText: tokens.gray600,
  exportBg: tokens.white,
  overlayBg: tokens.white,
  containerBorder: tokens.line,
} as const;

/** Общая часть layout для всех графиков Plotly.
 *
 * Осей здесь намеренно нет: заданный глобально `xaxis`/`yaxis` ломает
 * теплокарты с категориальными осями — Plotly считает высоту ячейки как NaN
 * и не рисует их (проверено на витрине). Цвет сетки при необходимости
 * задаётся в конкретном виджете. */
export const PLOT_BASE: Partial<Layout> = {
  font: { ...CHART.font },
  paper_bgcolor: CHART.paper,
  plot_bgcolor: CHART.paper,
  colorway: [...SERIES],
};
