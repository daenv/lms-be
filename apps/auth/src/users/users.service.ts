import { AccountRepository } from '@app/bootcamp-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: AccountRepository) {}

  private async validateCreateUserDto() {}
  async create() {}
}
