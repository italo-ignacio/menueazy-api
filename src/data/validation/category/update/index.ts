import { yup } from '@infra/yup';
import { stringNotRequired } from '@main/utils';

export const updateCategorySchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(100),
    description: stringNotRequired()
  })
});
