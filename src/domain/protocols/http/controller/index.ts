/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from 'express';

export type Controller = () => RequestHandler | any;
