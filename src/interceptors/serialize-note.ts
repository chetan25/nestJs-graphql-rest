import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor, ClassConstructor } from './serialize';

// custom note serializer decorator
export function NoteSerializer(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
