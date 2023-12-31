import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDto } from './dtos/media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {

    constructor(private readonly prisma: PrismaService) { }

    async postMedias(body: MediaDto) {
        
            return this.prisma.media.create({
                data: body
            })
        
    }

    async getMedias() {
        return this.prisma.media.findMany()
    }

    async getMediaById(id: number) {
        return this.prisma.media.findFirst({
            where: {
                id: id
            }
        });
    }

    async updateMediaById(id: number, body: MediaDto) {
        return await this.prisma.media.update({
            where: {
                id
            },
            data: {
                title: body.title,
                username: body.username
            }
        });
    }

    async deleteMediaById(id: number) {
        return await this.prisma.media.delete({
            where: {
                id
            }
        })
    }

    async mediaFindRepeateds(body: MediaDto) {
        const mediaRepeated = await this.prisma.media.findFirst({
            where: { title: body.title, username: body.username }
        })
        if (mediaRepeated) {
            throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
        }
    }    

    async mediaFind(id: number) {
        const mediaFiltered = await this.getMediaById(id)
        if (!mediaFiltered) {
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
    }
}
