import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Story {
  @Prop({ required: true })
  title: string = '';
  

  @Prop({ required: true })
  description: string = '';

}
export const StorySchema = SchemaFactory.createForClass(Story);