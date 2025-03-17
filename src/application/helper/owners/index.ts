import { canChangeRoles, Role } from '@domain/enum';
import { RequestUser } from '@domain/token';
import { toNumber } from '@main/utils';
import { userRepository } from '@repository/user';
import type { Request } from 'express';
import { finishedAt } from '../finished-at';

export const userIsOwner = (request: Request): boolean =>
  Number(request.params.id) === Number(request.user.id) || request.user.role === Role.ADMIN;

export const canChangeUser = async (
  user: RequestUser,
  userToChangeId?: number | string
): Promise<boolean | null> => {
  try {
    const changeUser = await userRepository.findOne({
      select: { id: true, companyId: true, role: true },
      where: { id: toNumber(userToChangeId), finishedAt }
    });

    if (!changeUser) return null;

    if (user.company.id !== changeUser.companyId) return false;

    if (canChangeRoles[user.role].includes(changeUser.role)) return true;

    return false;
  } catch {
    return null;
  }
};
