import { Request } from 'express';

export const canDeleteStyle = (request: Request): boolean => !!request;
export const canUpdateStyle = (request: Request): boolean => !!request;
