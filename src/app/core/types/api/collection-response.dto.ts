import { Expose, Type } from 'class-transformer';
import { ResponsePaginationDto } from './response-pagination.dto';
import { ResponseDto } from './response.dto';

export class CollectionResponseDto<T> extends ResponseDto<T[]> {
  @Expose()
  @Type(() => ResponsePaginationDto)
  meta: ResponsePaginationDto;

  constructor(data: T[], meta?: ResponsePaginationDto) {
    super(data);

    this.meta = meta;
  }
}
