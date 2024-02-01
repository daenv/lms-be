import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { AccountEntity } from '@app/bootcamp-data';
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
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      database: this.getValue('POSTGRES_DATABASE'),
      username: this.getValue('POSTGRES_USERNAME'),
      password: this.getValue('POSTGRES_PASSWORD'),
      migrations: ['lib/migrations/*.ts'],
      entities: [AccountEntity],
      migrationsTableName: 'migration',
    };
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_DATABASE',
  'POSTGRES_USERNAME',
  'POSTGRES_PASSWORD',
]);

export { configService };
