import { UserRestaurantEntity } from '@entity/user-restaurant';
import { DataSource } from '@infra/database';

export const userRestaurantRepository = DataSource.getRepository(UserRestaurantEntity);
