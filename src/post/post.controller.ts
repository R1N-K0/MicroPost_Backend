import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){
    }

    @Get()
    async getList(
        @Query("token") token: string,
        @Query("start") start: number,
        @Query("records") records: number,
        @Query("q") search: string
    ){
        if(search){
            return await this.postService.searchPost(token, start, records, search)
        } else {
            return await this.postService.getList(token, start, records);
        }   
    }

    @Post()
    async createPost(
        @Query("token") token: string,
        @Body("message") message: string
    ){
        return await this.postService.createPost(token, message);
    }

    @Delete()
    async deletePost(
        @Query("token") token: string,
        @Query("id") id: number
    ) {
        return await this.postService.deletePost(token, id);
    }
}
