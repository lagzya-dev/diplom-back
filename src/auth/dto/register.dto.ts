import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../../users/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: Role.CUSTOMER,
    description: 'User role',
    enum: Role,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
