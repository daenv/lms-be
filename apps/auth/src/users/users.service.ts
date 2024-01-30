import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repositoryUser: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new User({
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
