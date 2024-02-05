import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Response } from 'express';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateAccountFactory } from './api.create/create.accounts.factory';
import { AccountsErrorInterceptor } from './common';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseInterceptors(AccountsErrorInterceptor)
  public async register(
    @Res() res: Response,
    @Body() createAccountDto: CreateAccountDto,
  ) {}
}
