import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { User } from '../decorator/user.decorator';
import { NoteCreateDto } from './dto/note-create.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  async getAll(@User() user) {
    const notes = await this.noteService.getAll(user);

    return notes;
  }

  @Get('/:noteId')
  async getOne(@User() user, @Param('noteId') noteId: number) {
    const note = await this.noteService.getOen(noteId, user);

    return note;
  }

  @Post()
  async create(@Body() noteCreateDto: NoteCreateDto, @User() user) {
    const createdNote = await this.noteService.create(noteCreateDto, user);
    return createdNote;
  }

  @Put()
  update() {
    return 'this is updated note';
  }

  @Delete()
  delete() {
    return 'this is delete note';
  }
}
