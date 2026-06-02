import { Provider } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { organization, bearer } from 'better-auth/plugins';
import { ConfigType } from '@nestjs/config';
import databaseConfig from 'src/database/database.config';

import { Pool } from 'pg';

export const BETTER_AUTH = 'BETTER_AUTH';

export const BetterAuthProvider: Provider = {
  provide: BETTER_AUTH,
  inject: [databaseConfig.KEY],
  useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => {
    return betterAuth({
      logger: { level: 'debug' },
      database: new Pool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
      }),
      emailAndPassword: {
        enabled: true,
      },
      plugins: [
        bearer(),
        organization(), 
      ],
    });
  },
};