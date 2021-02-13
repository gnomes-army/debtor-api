import { Expose } from 'class-transformer';

export class ResponsePaginationDto {
  @Expose()
  nextCursor: string;

  constructor(id: string, createdAt: Date) {
    this.nextCursor = Buffer.from(`${id},${createdAt.getTime()}`).toString('base64');
  }
}
