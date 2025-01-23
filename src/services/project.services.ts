import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}
  

  async createProject(data: Partial<Project>): Promise<Project> {
    const newProject = new this.projectModel(data);
    return newProject.save();
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }
  
  async updateProject(id: string, updateData: Partial<Project>): Promise<Project | null> {
    if (!updateData) {
      throw new Error('Update data cannot be null');
    }
    return this.projectModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
  

  async deleteProject(id: string): Promise<{ deleted: boolean }> {
    const result = await this.projectModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount > 0 };
  }
}