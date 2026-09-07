/** Единая семантика статусов: тон + русская подпись.
 *
 * До редизайна цвета задавались пресетами antd (`Tag color="green"`), которые
 * не подчиняются теме и разошлись по семи файлам. Здесь один словарь; цвета
 * тонов живут в CSS (`.pill-*` в components.css).
 */

export type Tone = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray';

export interface StatusView {
  tone: Tone;
  label: string;
}

/** Статус загрузки физического датасета. */
export const DATASET_STATUS: Record<string, StatusView> = {
  uploading: { tone: 'yellow', label: 'Загрузка' },
  validating: { tone: 'yellow', label: 'Обработка' },
  ready: { tone: 'green', label: 'Готов' },
  failed: { tone: 'red', label: 'Ошибка' },
};

/** Итог health-проверки датасета. */
export const HEALTH_STATUS: Record<string, StatusView> = {
  good: { tone: 'green', label: 'В норме' },
  warning: { tone: 'orange', label: 'Предупреждения' },
  poor: { tone: 'red', label: 'Критические проблемы' },
  critical: { tone: 'red', label: 'Критические проблемы' },
};

/** Уровень отдельной health-проверки. */
export const SEVERITY_STATUS: Record<string, StatusView> = {
  info: { tone: 'blue', label: 'Информация' },
  warning: { tone: 'orange', label: 'Предупреждение' },
  error: { tone: 'red', label: 'Ошибка' },
  critical: { tone: 'red', label: 'Критично' },
};

/** Соблюдение SLA по операции. */
export const SLA_STATUS: Record<string, StatusView> = {
  good: { tone: 'green', label: 'В норме' },
  warning: { tone: 'yellow', label: 'На границе' },
  poor: { tone: 'red', label: 'Нарушения' },
  no_rule: { tone: 'gray', label: 'Нет правила' },
};

export const UNKNOWN_STATUS: StatusView = { tone: 'gray', label: '—' };

/** Вид статуса по словарю; неизвестное значение не роняет таблицу. */
export function statusView(
  dictionary: Record<string, StatusView>,
  key: string | null | undefined
): StatusView {
  if (!key) return UNKNOWN_STATUS;
  return dictionary[key] ?? { tone: 'gray', label: key };
}

export function isTerminalStatus(status: string): boolean {
  return status === 'ready' || status === 'failed';
}
