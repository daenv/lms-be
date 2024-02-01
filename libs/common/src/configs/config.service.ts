import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
config({ path: path.resolve(process.cwd(), 'apps/accounts/.env') });
class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      database: this.getValue('MYSQL_DATABASE'),
      username: this.getValue('MYSQL_USERNAME'),
      password: this.getValue('MYSQL_PASSWORD'),
      migrations: ['lib/migrations/*.ts'],
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      ssl: this.isProduction,
    };
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_DATABASE',
  'MYSQL_USERNAME',
  'MYSQL_PASSWORD',
]);

export { configService };
