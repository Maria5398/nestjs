import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostDto } from './dtos/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(){
    return await this.postService.getAll();
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findById(id);
  }
  @Post()
  async create(@Body() dto: PostDto) {
    return await this.postService.create(dto);
  }
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: PostDto) {
    return await this.postService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.delete(id);
  }
}
