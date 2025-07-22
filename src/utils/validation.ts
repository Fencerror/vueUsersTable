export const validateLabel = (value: string): string | null => {
  const labels = value.split(';').filter(l => l.trim().length > 0);
  for (const label of labels) {
    if (label.trim().length > 50) {
      return 'Метка не должна превышать 50 символов.';
    }
  }
  return null;
};

export const validateLogin = (value: string): string | null => {
  if (value.trim().length === 0) {
    return 'Логин обязателен.';
  }
  if (value.trim().length > 100) {
    return 'Логин не должен превышать 100 символов.';
  }
  return null;
};

export const validatePassword = (value: string | null, accountType: 'Локальная' | 'LDAP'): string | null => {
  if (accountType === 'Локальная') {
    if (!value || value.trim().length === 0) {
      return 'Пароль обязателен для локальной записи.';
    }
    if (value.trim().length > 100) {
      return 'Пароль не должен превышать 100 символов.';
    }
  }
  return null;
};