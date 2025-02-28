export enum Role {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  EMPLOYEE = 'EMPLOYEE'
}

export const getRoles = {
  [Role.ADMIN]: [Role.ADMIN],
  [Role.OWNER]: [Role.ADMIN, Role.OWNER],
  [Role.MANAGER]: [Role.ADMIN, Role.OWNER, Role.MANAGER],
  [Role.SUPERVISOR]: [Role.ADMIN, Role.OWNER, Role.MANAGER, Role.SUPERVISOR],
  [Role.EMPLOYEE]: [Role.ADMIN, Role.OWNER, Role.MANAGER, Role.SUPERVISOR, Role.EMPLOYEE]
};
