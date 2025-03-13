export const changeDate = (date: unknown): Date | undefined => {
  if (typeof date === 'undefined') return undefined;

  try {
    const newDate = new Date(String(date));
    return newDate;
  } catch {
    return undefined;
  }
};
