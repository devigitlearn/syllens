
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PreviewQuestionDto {
    @ApiProperty({
        example: 'What is the Basic Structure Doctrine?',
        description: 'Question asked by the student',
        maxLength: 1000,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    question!: string;

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Identifier of the uploaded study material',
        format: 'uuid',
    })
    @IsUUID()
    documentId!: string;
}
