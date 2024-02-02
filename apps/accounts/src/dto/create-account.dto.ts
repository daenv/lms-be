import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountsRequestMessage } from '@app/bootcamp-businesslogic';
export class CreateAccountDto {
  //   first name
  @ApiProperty({
    example: 'firstName',
    description: 'First Name',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    example: 'lastName',
    description: 'Last Name',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  lastName: string;

  // email
  @ApiProperty({
    example: 'daenvle69@gmail.ocm',
    description: 'Email of the user',
    format: 'email',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MinLength(5)
  @IsEmail()
  @MaxLength(255)
  email: string;

  // password
  @ApiProperty({
    example: 'secret password change me!',
    description: 'Password of the user',
    format: 'password',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    example: 'secret password repeat',
    description: 'Confirm password of the user',
    format: 'password',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  confirmPassword: string;

  public static toMessage(dto: CreateAccountDto): CreateAccountsRequestMessage {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      passwordRepeat: dto.confirmPassword,
    } as CreateAccountsRequestMessage;
  }
}
