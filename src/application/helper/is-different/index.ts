export const isDifferent = (oldValue: unknown, newValue: unknown): boolean => {
  if (typeof newValue === 'undefined') return false;

  console.log(oldValue, oldValue instanceof Date);
  console.log(newValue, newValue instanceof Date);

  if (oldValue instanceof Date && newValue instanceof Date) {
    return oldValue.toISOString() !== newValue.toISOString();
  }

  if (typeof oldValue === 'string' && typeof newValue === 'string') {
    return oldValue.trim() !== newValue.trim();
  }

  return oldValue !== newValue;
};
