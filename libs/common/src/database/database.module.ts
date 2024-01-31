import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from '../configs/typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(configOrm)],
  providers: [],
})
export class DatabaseModule {}
