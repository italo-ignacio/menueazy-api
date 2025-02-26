import { yup } from '@infra/yup';
import { stringRequired } from '@main/utils';

export const updateStyleSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(255),
    color: yup.object().shape({
      primary: stringRequired(7),
      textPrimary: stringRequired(7),
      secondary: stringRequired(7),
      textSecondary: stringRequired(7),
      background: stringRequired(7),
      text: stringRequired(7)
    })
  })
});
