export const toNumber = (num: unknown): number => (isNaN(Number(num)) ? -1 : Number(num));
