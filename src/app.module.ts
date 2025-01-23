import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './modules/project.module';
import { ProjectController } from './controllers/project.controller';
import { AppController } from './appController';

@Module({
  imports: [DatabaseModule, ProjectModule],
  controllers: [AppController,ProjectController],
})
export class AppModule {}