export type productQueryFields =
  | 'name'
  | 'priceNumber'
  | 'publishedBoolean'
  | 'highlightBoolean'
  | 'inStockBoolean'
  | 'totalRate'
  | 'finalPrice'
  | 'avgRateNumber'
  | 'totalOrderNumber';

export const productListQueryFields: productQueryFields[] = [
  'name',
  'priceNumber',
  'publishedBoolean',
  'totalRate',
  'finalPrice',
  'avgRateNumber',
  'totalOrderNumber',
  'highlightBoolean',
  'inStockBoolean'
];
