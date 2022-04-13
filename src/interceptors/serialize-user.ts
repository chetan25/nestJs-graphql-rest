import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor, ClassConstructor } from './serialize';

// custom user serializer decorator

export function UserSerializer(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
