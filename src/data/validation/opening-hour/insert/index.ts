import { DaysOfWeek } from '@domain/enum';
import { yup } from '@infra/yup';
import { enumTypeRequired } from '@main/utils';

const openingHourSchema = yup.object().shape({
  dayOfWeek: enumTypeRequired({ data: DaysOfWeek }),
  closingTime: yup
    .string()
    .required()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  openingTime: yup
    .string()
    .required()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
});

export const updateOpeningHourSchema = yup.object().shape({
  body: openingHourSchema
});

export const insertOpeningHourSchema = yup.object().shape({
  body: yup.object().shape({
    daysOfWeek: yup.array().of(openingHourSchema)
  })
});
