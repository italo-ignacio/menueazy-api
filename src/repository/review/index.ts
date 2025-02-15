import { DataSource } from '@infra/database';
import { ReviewEntity } from '@entity/review';

export const reviewRepository = DataSource.getRepository(ReviewEntity);
