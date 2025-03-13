import { findProductQueryParams } from '@data/search';
import { CategoryEntity } from '@entity/category';
import { ProductEntity } from '@entity/product';
import { productRepository } from '@repository/product';

export const findOneFullProduct = async (
  id: number,
  restaurantId: number
): Promise<(ProductEntity & { categoryList: CategoryEntity[] }) | null> => {
  const queryBuilder = productRepository
    .createQueryBuilder('p')
    .select(findProductQueryParams)
    .innerJoin('p.productCategoryList', 'pcl')
    .leftJoin('pcl.category', 'c')
    .leftJoin('p.productImageList', 'pil')
    .leftJoin('p.productOptionGroupList', 'pogl')
    .leftJoin('pogl.productOptionItemList', 'poil')
    .where('p.id = :id', { id })
    .andWhere('p.restaurantId = :restaurantId', { restaurantId })
    .andWhere('pcl.finishedAt IS NULL')
    .andWhere('p.finishedAt IS NULL')
    .andWhere('pil.finishedAt IS NULL')
    .andWhere('pogl.finishedAt IS NULL')
    .andWhere('poil.finishedAt IS NULL')
    .andWhere('c.finishedAt IS NULL')
    .orderBy('p.id', 'ASC')
    .addOrderBy('pogl.id', 'ASC')
    .addOrderBy('poil.id', 'ASC')
    .addOrderBy('pil.primary', 'DESC');

  const data = await queryBuilder.getOne();

  if (data === null) return null;

  const { productCategoryList, ...values } = data;

  return {
    ...values,
    categoryList: productCategoryList.map((itemCategory) => ({ ...itemCategory.category }))
  } as ProductEntity & { categoryList: CategoryEntity[] };
};
