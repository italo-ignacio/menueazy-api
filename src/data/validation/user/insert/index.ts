import { Role } from '@domain/enum';
import { yup } from '@infra/yup';
import { emailRequired, enumTypeRequired, numberNotRequired, stringRequired } from '@main/utils';

export const insertUserSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailRequired(),
    name: stringRequired(255),
    password: stringRequired().min(8),
    phone: stringRequired(25),
    role: enumTypeRequired({ data: Role }),
    restaurantId: numberNotRequired().integer()
  })
});
