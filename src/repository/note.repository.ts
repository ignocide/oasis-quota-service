import { Repository, EntityRepository, createQueryBuilder } from 'typeorm';
import { Note } from '../entity/note.entitiy';
import { User } from '../entity/user.entitiy';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {}
