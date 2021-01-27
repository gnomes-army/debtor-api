import {
  applyDecorators,
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

export const SerializeDto = () =>
  applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({ excludeExtraneousValues: true }),
  );
