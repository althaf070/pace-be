import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
