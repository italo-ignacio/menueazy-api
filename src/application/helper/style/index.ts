import { styleRepository } from '@repository/style';
import { Request } from 'express';

export const canChangeStyle = async (request: Request): Promise<boolean> => {
  try {
    const style = await styleRepository.findOne({
      where: { id: Number(request.params.id) },
      select: { id: true, company: { id: true } },
      relations: { company: true }
    });

    if (!style || style.company.id !== request.user.company.id) return false;

    return true;
  } catch {
    return false;
  }
};
