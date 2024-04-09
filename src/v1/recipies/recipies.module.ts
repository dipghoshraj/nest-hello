import { Module } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { RecipiesController } from './recipies.controller';

@Module({
  controllers: [RecipiesController],
  providers: [RecipiesService],
})
export class RecipiesModule {}
