import type { ProductEntity } from '@entity/product';
import type { FindOptionsSelect } from 'typeorm';

export const findProductQueryParams = [
  'c.id',
  'c.name',
  'c.description',
  'c.order',
  'c.createdAt',
  'c.updatedAt',
  'c.finishedAt',

  'p.id',
  'p.name',
  'p.description',
  'p.price',
  'p.totalOrder',
  'p.totalRate',
  'p.avgRate',
  'p.inStock',
  'p.published',
  'p.highlight',
  'p.discount',
  'p.startDiscountAt',
  'p.finishDiscountAt',
  'p.onlyInRestaurant',
  'p.priceByKmInDelivery',
  'p.createdAt',
  'p.updatedAt',
  'p.finishedAt',

  'pil.id',
  'pil.primary',
  'pil.url',
  'pil.createdAt',
  'pil.updatedAt',
  'pil.finishedAt',

  'pcl.id',
  'pcl.createdAt',
  'pcl.updatedAt',
  'pcl.finishedAt',

  'pogl.id',
  'pogl.description',
  'pogl.maxSelection',
  'pogl.minSelection',
  'pogl.name',
  'pogl.required',
  'pogl.createdAt',
  'pogl.updatedAt',
  'pogl.finishedAt',

  'poil.id',
  'poil.description',
  'poil.name',
  'poil.additionalPrice',
  'poil.imageUrl',
  'poil.createdAt',
  'poil.updatedAt',
  'poil.finishedAt'
];

export const productFindParams: FindOptionsSelect<ProductEntity> = {
  id: true,
  name: true,
  description: true,
  price: true,
  inStock: true,
  published: true,
  highlight: true,
  avgRate: true,
  totalOrder: true,
  totalRate: true,
  discount: true,
  startDiscountAt: true,
  finishDiscountAt: true,
  onlyInRestaurant: true,
  priceByKmInDelivery: true,

  productImageList: {
    id: true,
    primary: true,
    url: true,
    createdAt: true,
    updatedAt: true,
    finishedAt: true
  },

  createdAt: true,
  updatedAt: true,
  finishedAt: true
};
