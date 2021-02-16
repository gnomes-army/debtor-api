import { ResponseDto } from './response.dto';

export class CollectionResponseDto<T> extends ResponseDto<T[]> {
  constructor(data: T[]) {
    super(data);
  }
}
