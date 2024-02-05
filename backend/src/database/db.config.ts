import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

/**
 * The function exports a configuration object for connecting to a PostgreSQL database using Sequelize
 * ORM.
 * @param {ConfigService} configService - The `configService` parameter is an instance of a service
 * that provides access to configuration values. It is used to retrieve the values of various
 * configuration parameters such as the database host, port, username, password, database name, and
 * whether to automatically load models. These values are retrieved using the `get
 * @returns a configuration object for Sequelize, a Node.js ORM for SQL databases. The configuration
 * object includes properties such as the dialect (in this case, 'postgres' for PostgreSQL), host,
 * port, username, password, database name, and whether to automatically load models.
 */
export const dbConfig = (configService: ConfigService) => {
  const config: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT') || 5432,
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    autoLoadModels: configService.get<boolean>('DB_AUTO_LOAD_MODELS'),
  };

  return config;
};
