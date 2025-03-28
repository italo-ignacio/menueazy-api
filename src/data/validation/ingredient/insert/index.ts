import { IngredientMeasure } from '@domain/enum';
import { yup } from '@infra/yup';
import { enumTypeRequired, numberNotRequired, stringRequired } from '@main/utils';

export const insertIngredientSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(255),
    measure: enumTypeRequired({ data: IngredientMeasure }),
    minAlert: numberNotRequired()
  })
});
