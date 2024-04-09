import { Test, TestingModule } from '@nestjs/testing';
import { RecipiesService } from './recipies.service';

describe('RecipiesService', () => {
  let service: RecipiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipiesService],
    }).compile();

    service = module.get<RecipiesService>(RecipiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
