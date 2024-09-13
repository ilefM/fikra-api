import { MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(200)
  bio: string;
}
