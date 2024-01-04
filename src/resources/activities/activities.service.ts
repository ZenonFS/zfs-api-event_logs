import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Model } from 'mongoose';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel(Activity.name) private activityModel: Model<Activity>,
    ) {}

    create(createActivityDto: CreateActivityDto) {
        const createdActivity = new this.activityModel(createActivityDto);
        return createdActivity.save();
    }

    async findAll() {
        return await this.activityModel
            .find()
            .sort({ start_time: 'asc' })
            .exec();
    }

    async findOne(id: string) {
        return await this.activityModel.findById(id).exec();
    }

    async update(id: string, updateActivityDto: UpdateActivityDto) {
        await this.activityModel
            .updateOne({ _id: id }, updateActivityDto)
            .exec();
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.activityModel.findByIdAndRemove(id);
    }
}
