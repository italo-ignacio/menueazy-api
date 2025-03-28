import { IngredientDataEntity } from '@entity/ingredient-data';
import { ProductIngredientEntity } from '@entity/product-ingredient';
import { DataSource } from '@infra/database';
import { EntityManager } from 'typeorm';

type ProductItem = {
  productId: number;
  quantity: number;
  adjustments?: {
    ingredientId: number;
    remove?: number;
    add?: number;
  }[];
};

export async function consumeStockByProductList(productList: ProductItem[]) {
  await DataSource.transaction(async (manager) => {
    for (const item of productList) {
      const { productId, quantity, adjustments = [] } = item;

      const productIngredients = await manager.getRepository(ProductIngredientEntity).find({
        where: { productId }
      });

      const adjustmentsMap = new Map<number, { remove?: number; add?: number }>();
      for (const adj of adjustments) {
        adjustmentsMap.set(adj.ingredientId, adj);
      }

      for (const pi of productIngredients) {
        const baseQty = pi.quantity * quantity;
        const adjustment = adjustmentsMap.get(pi.ingredientId);
        const removed = adjustment?.remove ?? 0;
        const added = adjustment?.add ?? 0;

        const finalQty = baseQty - removed + added;

        if (finalQty > 0) {
          await consumeIngredientFIFO(manager, pi.ingredientId, finalQty);
        }
      }

      // const extraIngredients = adjustments.filter(
      //   (adj) => !productIngredients.some((pi) => pi.ingredientId === adj.ingredientId)
      // );

      // for (const extra of extraIngredients) {
      //   if (extra.add && extra.add > 0) {
      //     await consumeIngredientFIFO(manager, extra.ingredientId, extra.add * quantity);
      //   }
      // }
    }
  });
}

async function consumeIngredientFIFO(
  manager: EntityManager,
  ingredientId: number,
  quantityNeeded: number
) {
  const ingredientData = manager.getRepository(IngredientDataEntity);

  const ingredients = await ingredientData
    .createQueryBuilder('id')
    .select(['id.id'])
    .where('id.ingredientId = :ingredientId', { ingredientId })
    .andWhere('id.finishedAt = NULL', { ingredientId })
    .andWhere('id.quantity = :ingredientId', { ingredientId })
    .orderBy('id.expiresAt')
    .addOrderBy('id.createdAt')
    .getMany();

  let remaining = quantityNeeded;

  for (const ingredient of ingredients) {
    if (remaining <= 0) break;

    const toConsume = Math.min(ingredient.quantity, remaining);
    ingredient.quantity -= toConsume;
    remaining -= toConsume;

    await ingredientData.save(ingredient);
  }
}
