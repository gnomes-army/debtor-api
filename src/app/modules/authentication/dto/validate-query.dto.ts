import { IsNotEmpty } from 'class-validator';

export class ValidateQueryDto {
  @IsNotEmpty()
  redirectUri: string;

  @IsNotEmpty()
  code: string;
}
