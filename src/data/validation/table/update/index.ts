import { yup } from '@infra/yup';
import { stringNotRequired } from '@main/utils';

export const updateTableSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired(100),
    description: stringNotRequired()
  })
});
