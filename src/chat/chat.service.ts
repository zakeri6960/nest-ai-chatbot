import { Injectable } from '@nestjs/common';
import { DeepSeek, Ollama } from 'aiModels';
import axios from 'axios';
import ConnectMongoDB from 'DB/ConnectMongoDB';
import { Model } from 'DB/schema/modelsSchema';

@Injectable()
export class ChatService {
    

    async sendMessage(message: string): Promise<any> {
        const db = await ConnectMongoDB();
        let models = await Model.find({});
        const aiModel = models[0].modelname
        let response : any = ''
        if(aiModel == 'ollama'){
            response = await Ollama(message);
        }else if(aiModel == 'deepseek'){
            response = await DeepSeek(message);
        }

        return response;
    }
}