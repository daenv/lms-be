import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@app/bootcamp-entities';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Account) private repositoryUser: Repository<Account>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new Account({
      ...createUserDto,
    });
    try {
      const userCreated = await this.entityManager.save(user);
      if (!userCreated) {
        throw new BadRequestException('User not created');
      }
      return userCreated;
    } catch (error) {}
  }
}
