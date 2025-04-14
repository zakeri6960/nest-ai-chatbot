import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { message } from 'types';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}

    @Post('message')
    sendMessage(@Body() message: message) : Promise<any>{
        return this.chatService.sendMessage(message.message);
    }
}
