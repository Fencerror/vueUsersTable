export const validateLabel = (value: string): boolean => {
  return value.length <= 50; 
};

export const validateLogin = (value: string): boolean => {
  return value.length > 0 && value.length <= 100; 
};


export const validatePassword = (value: string | null, accountType: string): boolean => {
  if (accountType === 'Локальная') {
    return value !== null && value.length > 0 && value.length <= 100; 
  }
  return true; 
};