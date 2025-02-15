import type { Role } from '@domain/enum';

export interface UserTokenInput {
  id: number;
  email: string;
  firebaseId: string;
  role: Role;
  companyId: number;
}

export interface ClientTokenInput {
  id: number;
  email: string;
  firebaseId: string | null;
}

export interface LoginToken {
  iss: string;
  aud: string;
  user_id: string;
  email: string;
  email_verified: boolean;
}
