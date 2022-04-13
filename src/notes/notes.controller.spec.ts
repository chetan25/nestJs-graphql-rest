import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes-service';
import { NotesController } from './notes.controller';

describe('NotesController', () => {
  let controller: NotesController;
  const fakeNotesService: Partial<NotesService> = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: fakeNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
