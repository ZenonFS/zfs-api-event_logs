import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
    @Prop()
    start_time: Date;
    @Prop()
    end_time: Date;

    @Prop()
    activity: string;
    @Prop()
    details_activity: string;

    @Prop({ auto: true, default: new Date() })
    created_at: Date;
    @Prop({ auto: true, default: new Date() })
    update_at: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
