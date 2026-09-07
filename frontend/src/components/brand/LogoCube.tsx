/** Изометрический куб из дизайн-пакета «Газпром ЦПС».
 *
 * Вариант `onBrand` — оригинал прототипа: белая верхняя грань и полупрозрачный
 * контур, рассчитанные на синий сайдбар. На светлом фоне он растворяется,
 * поэтому для страницы входа есть вариант `onLight` с цветными гранями.
 *
 * ВНИМАНИЕ: это авторский плейсхолдер из пакета дизайна. Брендбук требует
 * оригинальные макеты фирменной символики от отдела бренда — заменить перед
 * передачей заказчику.
 */
export function LogoCube({
  size = 30,
  variant = 'onBrand',
}: {
  size?: number;
  variant?: 'onBrand' | 'onLight';
}) {
  const onLight = variant === 'onLight';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      {/* верхняя грань */}
      <path d="M20 3 L35 11 L20 19 L5 11 Z" fill={onLight ? '#D7F0FA' : '#FFFFFF'} />
      {/* левая грань */}
      <path d="M5 11 L20 19 L20 37 L5 29 Z" fill={onLight ? '#B7E3F5' : '#D7F0FA'} opacity=".95" />
      {/* правая грань */}
      <path d="M35 11 L20 19 L20 37 L35 29 Z" fill={onLight ? '#0079C2' : '#B7E3F5'} opacity=".95" />
      {/* контур */}
      <path
        d="M20 3 L35 11 L35 29 L20 37 L5 29 L5 11 Z M20 3 L20 19 M5 11 L20 19 L35 11"
        stroke={onLight ? '#033D62' : '#0079C2'}
        strokeWidth="1"
        strokeLinejoin="round"
        fill="none"
        opacity={onLight ? '1' : '.5'}
      />
      {/* оранжевый акцент */}
      <path d="M27 15 L32 17 L27 19 L22 17 Z" fill="#FF6919" />
    </svg>
  );
}
