import { Role } from '@domain/enum';
import { yup } from '@infra/yup';
import { emailNotRequired, enumTypeNotRequired, stringNotRequired } from '@main/utils';

export const updateUserSchema = yup.object().shape({
  body: yup.object().shape({
    email: emailNotRequired(),
    name: stringNotRequired(255),
    password: stringNotRequired().min(8),
    phone: stringNotRequired(25),
    role: enumTypeNotRequired({ data: Role })
  })
});
