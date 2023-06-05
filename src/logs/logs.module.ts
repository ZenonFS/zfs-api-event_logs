import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Log, LogSchema } from './entities/log.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [LogsController],
    providers: [LogsService],
    imports: [
        MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ],
})
export class LogsModule {}
