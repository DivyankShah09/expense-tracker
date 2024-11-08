import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':categoryname')
  async findByName(@Param('categoryname') categoryname: string) {
    return this.categoryService.findByName(categoryname);
  }
}
