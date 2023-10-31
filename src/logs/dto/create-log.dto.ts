import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
    @ApiProperty()
    start_time: Date;
    @ApiProperty()
    end_time: Date;
    @ApiProperty()
    activity: string;
    @ApiProperty()
    details_activity: string;
}
