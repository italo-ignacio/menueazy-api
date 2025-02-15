import { Langs } from '@domain/enum';
import type { ClientTokenInput, UserTokenInput } from '@domain/token';

declare global {
  namespace Express {
    interface Request {
      user: UserTokenInput;
      client: ClientTokenInput;
      lang: Langs;
    }
  }
}
