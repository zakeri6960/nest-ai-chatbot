import { Module } from '@nestjs/common';
import { RagsController } from './rags.controller';
import { RagsService } from './rags.service';

@Module({
  controllers: [RagsController],
  providers: [RagsService]
})
export class RagsModule {}
