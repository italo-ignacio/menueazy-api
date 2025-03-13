import { DataSource as TypeOrmDataSource } from 'typeorm';
import { env } from '../../main/config/env';

const rootPath = typeof env.TS_NODE_DEV === 'undefined' ? 'build' : 'src';

export const DataSource = new TypeOrmDataSource({
  database: env.DATABASE.name,
  entities: [`${rootPath}/entity/**/*`],
  host: env.DATABASE.host,
  logging: ['query'],
  password: env.DATABASE.password,
  port: Number(env.DATABASE.port),
  ssl: env.DATABASE.ssl,
  synchronize: env.DATABASE.synchronize,
  type: 'postgres',
  migrations: [`${rootPath}/migration/*.ts`],
  username: env.DATABASE.userName,
  migrationsRun: true
});
