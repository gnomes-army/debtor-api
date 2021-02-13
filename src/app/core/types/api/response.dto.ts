import { Expose } from 'class-transformer';

export class ResponseDto<T> {
  @Expose()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
