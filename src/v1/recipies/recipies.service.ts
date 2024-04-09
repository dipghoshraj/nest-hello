import { Injectable } from '@nestjs/common';
import { CreateRecipyDto } from './dto/create-recipy.dto';
import { UpdateRecipyDto } from './dto/update-recipy.dto';

@Injectable()
export class RecipiesService {
  create(createRecipyDto: CreateRecipyDto) {
    return 'This action adds a new recipy';
  }

  findAll() {
    return `This action returns all recipies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipy`;
  }

  update(id: number, updateRecipyDto: UpdateRecipyDto) {
    return `This action updates a #${id} recipy`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipy`;
  }
}
