export type productQueryFields =
  | 'name'
  | 'price'
  | 'published'
  | 'highlight'
  | 'inStock'
  | 'totalRate'
  | 'avgRate'
  | 'totalOrder';

export const productListQueryFields: productQueryFields[] = [
  'name',
  'price',
  'published',
  'totalRate',
  'avgRate',
  'totalOrder',
  'highlight',
  'inStock'
];
