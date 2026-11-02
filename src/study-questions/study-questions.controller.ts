
import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { StudyQuestionsService } from './study-questions.service';
import { PreviewQuestionDto } from './dto/preview-question.dto';

@ApiTags('Study Questions')
@Controller('study-questions')
export class StudyQuestionsController {
    constructor(
        private readonly studyQuestionsService: StudyQuestionsService,
    ) { }

    @Post('preview')
    @ApiOperation({
        summary: 'Validate a student question',
        description:
            'Validates a question and document ID without calling the AI model.',
    })
    @ApiBody({ type: PreviewQuestionDto })
    @ApiBadRequestResponse({
        description: 'Request validation failed.',
    })
    previewQuestion(@Body() dto: PreviewQuestionDto) {
        return this.studyQuestionsService.previewQuestion(dto);
    }
}
