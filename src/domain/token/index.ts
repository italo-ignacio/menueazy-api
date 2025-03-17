import type { Role } from '@domain/enum';

export interface RequestUser {
  id: number;
  email: string;
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
}

export interface UserTokenInput {
  id: number;
  email: string;
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
