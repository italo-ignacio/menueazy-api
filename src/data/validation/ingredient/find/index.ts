export type ingredientQueryFields =
  | 'name'
  | 'quantityNumber'
  | 'priceInStockNumber'
  | 'totalPriceNumber';

export const ingredientListQueryFields: ingredientQueryFields[] = [
  'name',
  'quantityNumber',
  'priceInStockNumber',
  'totalPriceNumber'
];
