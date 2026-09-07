import type { Tone } from '@/lib/status';

/** Статусная «пилюля» из дизайн-системы: цвет берётся из токенов (.pill-*),
 * а не из пресетов antd Tag, которые не подчиняются теме. */
export function Pill({
  tone = 'blue',
  dot = true,
  children,
}: {
  tone?: Tone;
  /** Точка перед текстом — как в прототипе для статусов. */
  dot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`pill pill-${tone}${dot ? ' pill-dot' : ''}`}>{children}</span>
  );
}
