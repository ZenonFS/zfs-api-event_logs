import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    StreamableFile,
    Res,
    Query,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import moment from 'moment';
import { ApiQuery } from '@nestjs/swagger';

@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Post()
    create(@Body() createLogDto: CreateLogDto) {
        return this.logsService.create(createLogDto);
    }

    @Get()
    findAll() {
        return this.logsService.findAll();
    }

    @Get('export')
    @ApiQuery({
        name: 'startDate',
        required: false,
        type: Date,
    })
    @ApiQuery({
        name: 'endDate',
        required: false,
        type: Date,
    })
    @ApiQuery({
        name: 'filename',
        required: false,
        type: String,
    })
    async export(
        @Res({ passthrough: true }) res: Response,
        @Query('filename') filename: string,
        @Query('startDate') startDate: Date = moment().startOf('day').toDate(),
        @Query('endDate') endDate: Date = moment().endOf('day').toDate(),
    ) {
        const _path = await this.logsService.export(startDate, endDate);

        const file = createReadStream(join(process.cwd(), _path));
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${
                filename || _path
            }"`,
        });
        res.type(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        return new StreamableFile(file);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.logsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
        return this.logsService.update(id, updateLogDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.logsService.remove(id);
    }
}
