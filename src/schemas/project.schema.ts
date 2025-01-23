import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ type: String, required: true })
  title: string = '';

  @Prop({ type: String, required: true })
  color: string = '';

  @Prop({ type: String, required: true })
  client: string = '';

  @Prop({ type: String, required: true })
  work: string = '';

  @Prop({ type: String, required: true })
  projectName: string = '';
  @Prop({ type: String, required: true })
  storyTitle: string = '';
  @Prop({ type: String, required: true })
  storyDescription: string = '';

  @Prop({ type: String, required: true })
  image: string = '';
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
