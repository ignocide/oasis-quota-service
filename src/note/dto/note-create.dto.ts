import { IsString } from 'class-validator';
import { User } from '../../entity/user.entitiy';

export class NoteCreateDto {
  @IsString()
  note: string;
}
