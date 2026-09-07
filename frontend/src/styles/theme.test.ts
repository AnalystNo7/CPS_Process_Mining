/** tokens.css — источник значений для CSS, theme.ts — для antd и графиков.
 * Тест держит их синхронными: расхождение = редизайн «поехал» в одном из мест. */
import { describe, expect, it } from 'vitest';

import { WIDGET_HEAD_PX, antdTheme, tokens, withAlpha } from './theme';
// ?raw — vite отдаёт содержимое файла строкой (работает и в vitest).
import css from './tokens.css?raw';

function cssVar(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`В tokens.css нет переменной --${name}`);
  return match[1].trim();
}

/** Пары «переменная в tokens.css» → «ключ в tokens из theme.ts». */
const COLOR_PAIRS: Array<[string, string]> = [
  ['gpc-blue', tokens.blue],
  ['gpc-blue-600', tokens.blue600],
  ['gpc-blue-700', tokens.blue700],
  ['gpc-blue-800', tokens.blue800],
  ['gpc-blue-900', tokens.blue900],
  ['gpc-orange', tokens.orange],
  ['gpc-orange-600', tokens.orange600],
  ['gpc-orange-700', tokens.orange700],
  ['gpc-sky', tokens.sky],
  ['gpc-sky-deep', tokens.skyDeep],
  ['gpc-sky-50', tokens.sky50],
  ['gpc-cyan', tokens.cyan],
  ['gpc-cyan-light', tokens.cyanLight],
  ['gpc-peach', tokens.peach],
  ['gpc-white', tokens.white],
  ['gpc-gray-50', tokens.gray50],
  ['gpc-gray-100', tokens.gray100],
  ['gpc-gray-150', tokens.gray150],
  ['gpc-gray-200', tokens.gray200],
  ['gpc-gray-300', tokens.gray300],
  ['gpc-gray-400', tokens.gray400],
  ['gpc-gray-500', tokens.gray500],
  ['gpc-gray-600', tokens.gray600],
  ['gpc-gray-700', tokens.gray700],
  ['gpc-gray-800', tokens.gray800],
  ['gpc-black', tokens.black],
  ['ok-green', tokens.ok],
  ['ok-green-bg', tokens.okBg],
  ['warn', tokens.warn],
  ['warn-bg', tokens.warnBg],
  ['warn-text', tokens.warnText],
  ['err', tokens.err],
  ['err-bg', tokens.errBg],
  ['info', tokens.info],
  ['info-bg', tokens.infoBg],
  ['orange-bg', tokens.orangeBg],
  ['page-bg', tokens.pageBg],
  ['card-bg', tokens.cardBg],
  ['line', tokens.line],
  ['line-strong', tokens.lineStrong],
];

describe('tokens.css ↔ theme.ts', () => {
  it.each(COLOR_PAIRS)('--%s совпадает с theme.ts', (name, value) => {
    expect(cssVar(name).toUpperCase()).toBe(value.toUpperCase());
  });

  it('шрифты совпадают', () => {
    expect(cssVar('font-ui')).toBe(tokens.fontUi);
    expect(cssVar('font-head')).toBe(tokens.fontHead);
  });

  it('радиусы совпадают', () => {
    expect(cssVar('r-xs')).toBe(`${tokens.rXs}px`);
    expect(cssVar('r-sm')).toBe(`${tokens.rSm}px`);
    expect(cssVar('r-md')).toBe(`${tokens.rMd}px`);
    expect(cssVar('r-lg')).toBe(`${tokens.rLg}px`);
    expect(cssVar('r-xl')).toBe(`${tokens.rXl}px`);
  });

  it('тени совпадают', () => {
    expect(cssVar('shadow-card')).toBe(tokens.shadowCard);
    expect(cssVar('shadow-pop')).toBe(tokens.shadowPop);
    expect(cssVar('shadow-modal')).toBe(tokens.shadowModal);
  });

  it('высота шапки виджета совпадает', () => {
    expect(cssVar('widget-head-h')).toBe(`${WIDGET_HEAD_PX}px`);
  });

  it('базовая типографика body совпадает с темой antd', () => {
    expect(css).toMatch(/font-size:\s*14px/);
    expect(css).toMatch(/line-height:\s*1\.5/);
    expect(antdTheme.token?.fontSize).toBe(14);
    expect(antdTheme.token?.lineHeight).toBe(1.5);
    expect(antdTheme.token?.fontFamily).toBe(tokens.fontUi);
  });
});

describe('тема antd', () => {
  it('строится из токенов, без сторонних значений', () => {
    const known = new Set(
      Object.values(tokens)
        .filter((v) => typeof v === 'string' && v.startsWith('#'))
        .map((v) => String(v).toUpperCase())
    );
    const colorEntries = Object.entries(antdTheme.token ?? {}).filter(
      ([key, value]) => key.startsWith('color') && typeof value === 'string'
    ) as Array<[string, string]>;

    for (const [key, value] of colorEntries) {
      if (!value.startsWith('#')) continue; // rgba(...) — маска и кольцо фокуса
      expect(known, `${key}=${value} нет в tokens`).toContain(value.toUpperCase());
    }
  });

  it('высота шапки карточки виджета связана с токеном', () => {
    expect(antdTheme.components?.Card?.headerHeightSM).toBe(WIDGET_HEAD_PX);
  });
});

describe('withAlpha', () => {
  it('превращает hex в rgba', () => {
    expect(withAlpha('#0079C2', 0.12)).toBe('rgba(0, 121, 194, 0.12)');
  });

  it('понимает короткую запись', () => {
    expect(withAlpha('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
  });
});
