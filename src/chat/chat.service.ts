import { Injectable } from '@nestjs/common';
import { DeepSeek, Ollama } from 'aiModels';
import ConnectMongoDB from 'DB/ConnectMongoDB';
import { Conversation } from 'DB/schema/conversationSchema';
import { Model } from 'DB/schema/modelsSchema';

@Injectable()
export class ChatService {
    

    async sendMessage(message: string): Promise<any> {
        const db = await ConnectMongoDB();
        let models = await Model.find({});
        const aiModel = models[0].modelname
        let response : any = ''
        message += ': in this conversation you are assistant. respond to the last message from user on previous conversation';
        if(aiModel == 'ollama'){
            response = await Ollama(message);
        }else if(aiModel == 'deepseek'){
            response = await DeepSeek(message);
        }

        

        return {message: response} //response;
    }
}

async function storeMessages(role: string, message: string){
    const saveMessage = await Conversation.create({role, message}) 
}