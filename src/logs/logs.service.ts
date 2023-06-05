import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
import { Model } from 'mongoose';
import XLSX from './../config/xlsx';
import { randomUUID } from 'crypto';
import moment from 'moment';

@Injectable()
export class LogsService {
    constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

    create(createLogDto: CreateLogDto) {
        const createdLog = new this.logModel(createLogDto);
        return createdLog.save();
    }

    async findAll() {
        return await this.logModel.find().sort({ start_time: 'desc' }).exec();
    }

    async findOne(id: string) {
        return await this.logModel.findById(id).exec();
    }

    async export(startDate: Date, endDate: Date) {
        const logs = await this.logModel
            .find()
            .where({
                start_time: {
                    $gte: startDate,
                },
                end_time: {
                    $lte: moment(endDate).endOf('day').toDate(),
                },
            })
            .exec();

        const DATA_TO_RETURN = logs.map((log) => {
            const startDate = moment(log.start_time).locale('es');

            const duration = moment.duration(
                moment(log.end_time).diff(log.start_time),
            );

            return {
                Dia: startDate.format('dddd'),
                Fecha: startDate.format('DD/MM/YYYY'),
                Horas: duration.asHours().toFixed(2),
                Proyecto: log.activity,
                Detalles: log.details_activity,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(DATA_TO_RETURN, {
            header: ['Dia', 'Fecha', 'Horas', 'Proyecto', 'Detalles'],
            cellStyles: true,
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Logs');

        const PATH = `public/${randomUUID()}_Report Logs.xlsx`;
        XLSX.writeFile(workbook, PATH, {
            compression: true,
        });
        return PATH;
    }

    async update(id: string, updateLogDto: UpdateLogDto) {
        await this.logModel.updateOne({ _id: id }, updateLogDto).exec();
        return this.findOne(id);
    }

    async remove(id: string) {
        await this.logModel.findByIdAndRemove(id);
    }
}
