
import { Injectable } from '@nestjs/common';
import { PreviewQuestionDto } from './dto/preview-question.dto';

@Injectable()
export class StudyQuestionsService {
    previewQuestion(dto: PreviewQuestionDto) {
        return {
            message: 'Question validated successfully',
            data: {
                question: dto.question,
                documentId: dto.documentId,
            },
        };
    }
}
