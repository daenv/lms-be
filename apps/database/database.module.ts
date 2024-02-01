import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../../libs/common/src/configs/config.service';
import { DatabaseSerivce } from './database.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '.env'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  providers: [DatabaseSerivce],
})
export class DatabaseModule {}
