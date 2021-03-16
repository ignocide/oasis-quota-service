import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entity/note.entitiy';
import { User } from '../entity/user.entitiy';
import { NoteRepository } from '../repository/note.repository';
import { NoteCreateDto } from './dto/note-create.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: NoteRepository,
  ) {}

  getAll(user: User): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user: user, deleted: false },
    });
  }

  getOen(id: number, user: User) {
    const note = this.noteRepository.findOne({
      where: { id, user: user, deleted: false },
    });

    if (note) {
      throw new NotFoundException('not found note');
    }

    return note;
  }

  async create(noteCreateDto: NoteCreateDto, user: User) {
    const createdNote = await this.noteRepository.save({
      ...noteCreateDto,
      user,
    });

    return createdNote;
  }

  update() {}

  delete() {}
}
