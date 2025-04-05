export type productQueryFields =
  | 'name'
  | 'priceNumber'
  | 'publishedBoolean'
  | 'highlightBoolean'
  | 'inStockBoolean'
  | 'totalRate'
  | 'avgRateNumber'
  | 'totalOrderNumber';

export const productListQueryFields: productQueryFields[] = [
  'name',
  'priceNumber',
  'publishedBoolean',
  'totalRate',
  'avgRateNumber',
  'totalOrderNumber',
  'highlightBoolean',
  'inStockBoolean'
];
