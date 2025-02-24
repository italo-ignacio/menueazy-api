import { Request } from 'express';

export const canDeleteRestaurant = (request: Request): boolean => !!request;
export const canUpdateRestaurant = (request: Request): boolean => !!request;
