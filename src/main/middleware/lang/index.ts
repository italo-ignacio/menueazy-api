import { Langs, LangsList } from '@domain/enum';
import type { Controller } from '@domain/protocols';
import type { NextFunction, Request, Response } from 'express';

export const langMiddleware: Controller =
  () => async (request: Request, response: Response, next: NextFunction) => {
    const { lang } = request.headers;

    if (typeof lang === 'string') {
      const newLang = LangsList.includes(lang as Langs) ? lang : 'en';

      Object.assign(request, { lang: newLang });
    }

    next();
  };
