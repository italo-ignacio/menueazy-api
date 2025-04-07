import { IngredientMeasure } from '@domain/enum';
import { yup } from '@infra/yup';
import {
  booleanNotRequired,
  enumTypeNotRequired,
  numberNotRequired,
  stringNotRequired
} from '@main/utils';

export const updateIngredientSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(255),
    measure: enumTypeNotRequired({ data: IngredientMeasure }),
    minAlert: numberNotRequired(),
    removeImage: booleanNotRequired()
  })
});
