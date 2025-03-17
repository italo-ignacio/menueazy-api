import { Langs } from '@domain/enum';
import type { ClientTokenInput, RequestUser } from '@domain/token';

declare global {
  namespace Express {
    interface Request {
      user: RequestUser;
      restaurant: {
        id: number;
        name: string;
        restaurantUrl: string;
        style: { id: number };
        address: { id: number };
      };
      client: ClientTokenInput;
      lang: Langs;
    }
  }
}
