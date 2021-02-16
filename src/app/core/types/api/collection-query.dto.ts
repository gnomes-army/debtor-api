import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max } from 'class-validator';

export class CollectionQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  readonly page: number = 1;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  readonly limit = 30;
}
