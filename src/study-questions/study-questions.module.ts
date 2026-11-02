import { Module } from '@nestjs/common';
import { StudyQuestionsController } from './study-questions.controller';
import { StudyQuestionsService } from './study-questions.service';

@Module({
  controllers: [StudyQuestionsController],
  providers: [StudyQuestionsService]
})
export class StudyQuestionsModule {}
