import { Module } from '@nestjs/common';
import { PiController } from './pi.controller';
import { PiService } from './pi.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PiModel, PiSchema } from './pi.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PiModel.name,
        schema: PiSchema,
      },
    ]),
  ],
  exports: [PiModule],
  controllers: [PiController],
  providers: [PiService],
})
export class PiModule {}
