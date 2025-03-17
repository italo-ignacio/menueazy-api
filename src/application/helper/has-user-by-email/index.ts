import type { UserEntity } from '@entity/user';
import { userRepository } from '@repository/user';
import { finishedAt } from '../finished-at';

export const hasUserByEmail = async (
  email: string
): Promise<
  Pick<UserEntity, 'createdAt' | 'email' | 'id' | 'name' | 'phone' | 'role'> | boolean
> => {
  return (
    (await userRepository.findOne({
      select: {
        createdAt: true,
        email: true,
        id: true,
        name: true,
        phone: true,
        role: true
      },
      where: { email, finishedAt }
    })) ?? false
  );
};
