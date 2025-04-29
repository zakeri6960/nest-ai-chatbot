import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RagsService } from './rags.service';
import { RagType } from 'lib/types';

@Controller('rags')
export class RagsController {
    constructor(private readonly ragsService: RagsService){}

    @Get()
    getRgas(){
        return this.ragsService.getRags();
    }

    @Post('create')
    createRag(@Body() ragData: RagType){
        return this.ragsService.createRag(ragData);
    }

    @Post('update')
    updateRag(@Body() ragData: RagType){
        return this.ragsService.updateRag(ragData);
    }

    @Delete('delete')
    deleteRag(@Body() ragId: {ragId: string}){
        return this.ragsService.deleteRag(Number(ragId.ragId));
    }

}
