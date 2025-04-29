import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService){}

    @Get()
    getModels(){
        return this.modelsService.getModels();
    }

    @Post('active')
    modelActivation(@Body() modelId: {modelId: string}){
        return this.modelsService.modelActivation(Number(modelId.modelId));
    }
}
