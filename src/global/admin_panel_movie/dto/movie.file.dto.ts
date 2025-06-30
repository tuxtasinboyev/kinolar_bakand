import { VideoQuality } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileUploads {
    @ApiProperty({
        enum: VideoQuality,
        example: VideoQuality['720p'],
        description: "Video quality (e.g., 240p, 360p, 480p, 720p, 1080p, 4K)"
    })
    @IsEnum(VideoQuality)
    quality: VideoQuality;

    @ApiProperty({
        example: "en",
        description: "Video language code (e.g., 'en', 'uz', 'ru')"
    })
    @IsString()
    language: string;
}
