import { Module } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './logs/entities/log.entity';
import { ConfigModule } from '@nestjs/config';
import { ActivitiesModule } from './resources/activities/activities.module';
import {
    Activity,
    ActivitySchema,
} from './resources/activities/entities/activity.entity';
import { ActivitiesService } from './resources/activities/activities.service';
import { ActivitiesController } from './resources/activities/activities.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            dbName: 'labor-binnacle',
        }),
        MongooseModule.forFeature([
            { name: Log.name, schema: LogSchema },
            { name: Activity.name, schema: ActivitySchema },
        ]),
        LogsModule,
    ],
    controllers: [LogsController, ActivitiesController],
    providers: [LogsService, ActivitiesService, ActivitiesModule],
})
export class AppModule {}
