import { yup } from '@infra/yup';
import { arrayRequired, numberRequired, stringNotRequired } from '@main/utils';

export const updateCategorySchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(100),
    description: stringNotRequired(),
    order: stringNotRequired()
  })
});

export const updateCategoryOrderSchema = yup.object().shape({
  body: yup.object().shape({
    categoryList: arrayRequired(
      yup.object().shape({ id: numberRequired().integer(), order: numberRequired().integer() })
    )
  })
});
