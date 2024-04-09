import { Test, TestingModule } from '@nestjs/testing';
import { RecipiesController } from './recipies.controller';
import { RecipiesService } from './recipies.service';

describe('RecipiesController', () => {
  let controller: RecipiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipiesController],
      providers: [RecipiesService],
    }).compile();

    controller = module.get<RecipiesController>(RecipiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
