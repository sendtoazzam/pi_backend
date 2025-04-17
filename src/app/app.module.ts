import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema } from './auth/users.model';
import { PiModule } from './pi/pi.module';
import { PiService } from './pi/pi.service';
import { PiModel, PiSchema } from './pi/pi.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: usersSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: PiModel.name,
        schema: PiSchema,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    PiModule,
    AuthModule,
  ],
  providers: [SeedService, PiService],
})
export class AppModule {}
