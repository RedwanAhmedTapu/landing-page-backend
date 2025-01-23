import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://landingpage:landing2450@cluster0.am6vh.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0'
    ),
  ],
})
export class DatabaseModule {}
