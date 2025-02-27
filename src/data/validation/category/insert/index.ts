import { yup } from '@infra/yup';
import { stringNotRequired, stringRequired } from '@main/utils';

export const insertCategorySchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(100),
    description: stringNotRequired()
  })
});
