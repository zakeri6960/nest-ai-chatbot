import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RagsModule } from './rags/rags.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [ChatModule, RagsModule, ModelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
