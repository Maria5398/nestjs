import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from './dtos/post.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: PostRepository,
  ){}

  async getAll(): Promise<PostEntity[]> {
    const list = await this.postRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'las lista esta vacia' });
    }
    return list;
  }

  async findById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException({ message: 'no existe el post solicitado' });
    }
    return post;
  }
  async findByNombre(nombre: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne(nombre);
    return post;
  }

  async create(dto: PostDto): Promise<any>{
    const post = this.postRepository.create(dto);
    await this.postRepository.save(post);
    return { message: `post ${post.nombre} create` };
  }

  async update(id: number, dto: PostDto): Promise<any>{
    const post = await this.findById(id);
    dto.nombre ? (post.nombre = dto.nombre) : (post.nombre = post.nombre);
    dto.precio ? (post.precio = dto.precio) : (post.precio = post.precio);
    await this.postRepository.save(post);
    return { message: `post ${post.nombre} modificado` };
  }

  async delete(id: number): Promise<any> {
    const post = await this.findById(id);
    await this.postRepository.delete(post);
    return { message: `post ${post.nombre} eliminado` };
  }
}