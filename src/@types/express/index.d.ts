import { Langs, Role } from '@domain/enum';
import type { ClientTokenInput } from '@domain/token';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
        avatarUrl: string;
        firebaseId: string;
        name: string;
        phone: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
        finishedAt: Date | null;
        company: {
          id: number;
          name: string;
          companyUrl: string;
        };
      };
      restaurant: {
        id: number;
        url: string;
      };
      client: ClientTokenInput;
      lang: Langs;
    }
  }
}
