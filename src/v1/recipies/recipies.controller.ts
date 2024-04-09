import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { CreateRecipyDto } from './dto/create-recipy.dto';
import { UpdateRecipyDto } from './dto/update-recipy.dto';

@Controller('recipies')
export class RecipiesController {
  constructor(private readonly recipiesService: RecipiesService) {}

  @Post()
  create(@Body() createRecipyDto: CreateRecipyDto) {
    return this.recipiesService.create(createRecipyDto);
  }

  @Get()
  findAll() {
    return this.recipiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipyDto: UpdateRecipyDto) {
    return this.recipiesService.update(+id, updateRecipyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipiesService.remove(+id);
  }
}
