import { Module } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './logs/entities/log.entity';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI, {
            dbName: 'labor-binnacle',
        }),
        MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
        LogsModule,
    ],
    controllers: [LogsController],
    providers: [LogsService],
})
export class AppModule {}
