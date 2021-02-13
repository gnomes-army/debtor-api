import { IsBase64, IsNumberString, IsOptional } from 'class-validator';

export class CollectionQueryDto {
  @IsOptional()
  @IsBase64()
  cursor: string;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
