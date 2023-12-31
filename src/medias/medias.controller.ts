import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediaDto } from './dtos/media.dto';

@Controller('medias')
export class MediasController {

    constructor(private readonly mediasService: MediasService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async postMedias(@Body() body: MediaDto) {
        return await this.mediasService.postMedias(body);
    }

    @Get()
    async getMedias() {
        return await this.mediasService.getMedias();
    }

    @Get(':id')
    async getMediaById(@Param('id', ParseIntPipe) id: number) {
        return await this.mediasService.getMediaById(id);
    }

    @Put(':id')
    async updateMediaById(@Param('id', ParseIntPipe) id: number, @Body() body: MediaDto) {
        return await this.mediasService.updateMediaById(id, body);
    }

    @Delete(':id')
    async deleteMediaById(@Param('id', ParseIntPipe) id: number) {
        return await this.mediasService.deleteMediaById(id);
    }
}
