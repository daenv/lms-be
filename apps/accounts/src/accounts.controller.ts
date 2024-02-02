import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Response } from 'express';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  public async register(
    @Res() res: Response,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const controller = new 
  }
}
