import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@app/common';
import { AccountEntity } from '@app/bootcamp-data';
import { AccountSerivce } from '@app/bootcamp-businesslogic';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [AccountsController],
  providers: [AccountSerivce],
})
export class AccountsModule {}
