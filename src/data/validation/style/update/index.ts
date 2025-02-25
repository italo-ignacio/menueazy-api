import { yup } from '@infra/yup';
import { stringNotRequired, stringRequired } from '@main/utils';

export const updateStyleSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringRequired(255)
  })
});

export const updateColorSchema = yup.object().shape({
  body: yup.object().shape({
    primary: stringNotRequired(7),
    textPrimary: stringNotRequired(7),
    secondary: stringNotRequired(7),
    textSecondary: stringNotRequired(7),
    background: stringNotRequired(7),
    text: stringNotRequired(7)
  })
});
