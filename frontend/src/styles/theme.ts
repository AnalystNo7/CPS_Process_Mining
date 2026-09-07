/** JS-зеркало дизайн-токенов из tokens.css.
 *
 * tokens.css — источник для CSS, этот файл — для того, что CSS-переменные
 * не видит: тема Ant Design, Plotly и Cytoscape (canvas/SVG в data-URI).
 * Значения обязаны совпадать с tokens.css — сверяет theme.test.ts.
 */
import type { ThemeConfig } from 'antd';

export const tokens = {
  // Основной бренд
  blue: '#0079C2',
  blue600: '#0068A8',
  blue700: '#055791',
  blue800: '#033D62',
  blue900: '#022A45',

  // Акцент
  orange: '#FF6919',
  orange600: '#E85600',
  orange700: '#D65200',

  // Дополнительные
  sky: '#D7F0FA',
  skyDeep: '#B7E3F5',
  sky50: '#EAF6FC',
  cyan: '#27AFF5',
  cyanLight: '#47D8FF',
  peach: '#FFC198',

  // Нейтрали
  white: '#FFFFFF',
  gray50: '#F7F9FB',
  gray100: '#ECECEC',
  gray150: '#E4E8EC',
  gray200: '#CFD6DD',
  gray300: '#B7C7D1',
  gray400: '#8FA0AD',
  gray500: '#667482',
  gray600: '#4B5864',
  gray700: '#2E3944',
  gray800: '#1A232C',
  black: '#0A1017',

  // Семантика
  ok: '#1F9D5E',
  okBg: '#E3F5EB',
  warn: '#E89A14',
  warnBg: '#FFF2D6',
  warnText: '#B7780A',
  err: '#D43232',
  errBg: '#FBE4E4',
  info: '#0079C2',
  infoBg: '#D7F0FA',
  orangeBg: '#FFE7D8',

  // Страница
  pageBg: '#F2F5F8',
  cardBg: '#FFFFFF',
  line: '#E4E8EC',
  lineStrong: '#CFD6DD',

  // Типографика
  fontUi: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontHead: "'PT Sans Narrow', 'Oswald', 'Inter', sans-serif",

  // Радиусы
  rXs: 4,
  rSm: 6,
  rMd: 8,
  rLg: 12,
  rXl: 16,

  // Тени
  shadowCard: '0 1px 2px rgba(10, 16, 23, .04), 0 2px 8px rgba(10, 16, 23, .04)',
  shadowPop: '0 8px 32px rgba(10, 16, 23, .12), 0 2px 8px rgba(10, 16, 23, .06)',
  shadowModal: '0 24px 64px rgba(10, 16, 23, .24)',
} as const;

/** Высота шапки виджета; зеркало --widget-head-h.
 * WidgetCard вычитает её из высоты карточки, durationLayout — из высоты сетки. */
export const WIDGET_HEAD_PX = 44;

/** Полупрозрачный вариант цвета: `withAlpha(tokens.blue, 0.2)`. */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const antdTheme: ThemeConfig = {
  token: {
    // Палитра
    colorPrimary: tokens.blue,
    colorPrimaryHover: tokens.blue600,
    colorPrimaryActive: tokens.blue700,
    colorPrimaryBg: tokens.sky,
    colorPrimaryBgHover: tokens.skyDeep,
    colorPrimaryBorder: tokens.skyDeep,
    colorInfo: tokens.info,
    colorInfoBg: tokens.infoBg,
    colorSuccess: tokens.ok,
    colorSuccessBg: tokens.okBg,
    colorWarning: tokens.warn,
    colorWarningBg: tokens.warnBg,
    colorError: tokens.err,
    colorErrorBg: tokens.errBg,

    // Текст: соответствует шкале --gpc-gray-*
    colorText: tokens.gray800,
    colorTextSecondary: tokens.gray700,
    colorTextTertiary: tokens.gray500,
    colorTextDescription: tokens.gray500,
    colorTextQuaternary: tokens.gray400,

    // Поверхности и линии
    colorBgLayout: tokens.pageBg,
    colorBgContainer: tokens.cardBg,
    colorFillAlter: tokens.gray50,
    colorBgMask: 'rgba(10, 16, 23, .45)',
    colorBorder: tokens.lineStrong,
    colorBorderSecondary: tokens.line,

    // Геометрия
    borderRadius: tokens.rSm,
    borderRadiusXS: tokens.rXs,
    borderRadiusSM: tokens.rSm,
    borderRadiusLG: tokens.rLg,
    controlHeight: 36,
    controlHeightSM: 30,
    controlOutlineWidth: 3,
    controlOutline: withAlpha(tokens.blue, 0.12),

    // Типографика
    fontFamily: tokens.fontUi,
    fontSize: 14,
    lineHeight: 1.5,
    fontSizeHeading1: 28,
    fontSizeHeading2: 22,
    fontSizeHeading3: 18,
    fontSizeHeading4: 15,

    // Тени
    boxShadow: tokens.shadowModal,
    boxShadowSecondary: tokens.shadowPop,
    boxShadowTertiary: tokens.shadowCard,
  },
  components: {
    Button: {
      fontWeight: 600,
      contentFontSize: 13,
      contentFontSizeSM: 12.5,
      defaultColor: tokens.gray700,
      defaultBorderColor: tokens.lineStrong,
      defaultHoverColor: tokens.gray800,
      defaultHoverBorderColor: tokens.gray400,
      defaultHoverBg: tokens.white,
      textHoverBg: tokens.sky,
    },
    Input: { fontSize: 13 },
    InputNumber: { fontSize: 13 },
    Select: { fontSize: 13 },
    DatePicker: { fontSize: 13 },
    Table: {
      cellFontSize: 13,
      cellPaddingBlock: 10,
      cellPaddingInline: 12,
      headerBg: tokens.gray50,
      headerColor: tokens.gray500,
      rowHoverBg: tokens.gray50,
    },
    Tabs: {
      titleFontSize: 13.5,
      itemColor: tokens.gray500,
      itemSelectedColor: tokens.blue,
      itemHoverColor: tokens.gray800,
      inkBarColor: tokens.blue,
    },
    // Карточки виджетов и фильтров — size="small", отсюда *SM-токены.
    Card: {
      headerFontSize: 15,
      headerFontSizeSM: 15,
      headerHeightSM: WIDGET_HEAD_PX,
      paddingLG: 20,
    },
    Tag: { borderRadiusSM: 999 },
    Modal: { titleFontSize: 20 },
  },
};
