import { Injectable } from '@nestjs/common';
import { Ollama } from 'lib/agent';
import ConnectMongoDB from 'lib/DB/ConnectMongoDB';
import { Model } from 'lib/DB/schema/modelsSchema';

@Injectable()
export class ChatService {
    

    async sendMessage(message: string): Promise<any> {
        const db = await ConnectMongoDB();
        let activeModelObj = await Model.findOne({active: true}, {model: 1, _id: 0});
        if(!activeModelObj){
            return{
                status: "error",
                message: "No active model found",
                data: null
            }
        }
        const activeModel = activeModelObj.model;
        const response = await Ollama(message, activeModel);
        return {
            status: "success",
            message: null,
            data: response
        }
    }
}

