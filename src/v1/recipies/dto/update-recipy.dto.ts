import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipyDto } from './create-recipy.dto';

export class UpdateRecipyDto extends PartialType(CreateRecipyDto) {}
