import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema()
export class Activity {
    @Prop()
    name: string;

    @Prop({ auto: true, default: new Date() })
    created_at: Date;
    @Prop({ auto: true, default: new Date() })
    update_at: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
