import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from '../services/project.services';
import { Project } from '../schemas/project.schema';
import { multerOptions } from '../middleware/upload.middleware';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create a new project
  @Post('file')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createProject(
    @Body() data: Partial<Project>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Project> {
    try {
      const imagePath = file ? file.path : null;
      return await this.projectService.createProject({
        ...data,
        ...(imagePath && { image: imagePath }),
      });
    } catch (error) {
      console.error('Error creating project:', error);
      throw new BadRequestException('Failed to create project');
    }
  }

  // Get all projects
  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectService.getAllProjects();
  }

  // Get a project by ID
  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project | null> {
    try {
      const project = await this.projectService.getProjectById(id);
      if (!project) {
        throw new BadRequestException(`Project with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      console.error(`Error retrieving project with ID ${id}:`, error);
      throw error;
    }
  }

  // Update a project
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateProject(
    @Param('id') id: string,
    @Body() updateData: Partial<Project>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Project | null> {
    try {
      const imagePath = file ? file.path : undefined;
      const updatedProject = await this.projectService.updateProject(id, {
        ...updateData,
        ...(imagePath && { image: imagePath }),
      });
      if (!updatedProject) {
        throw new BadRequestException(`Project with ID ${id} not found`);
      }
      return updatedProject;
    } catch (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw new BadRequestException('Failed to update project');
    }
  }

  // Delete a project
  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<{ deleted: boolean }> {
    try {
      const result = await this.projectService.deleteProject(id);
      if (!result.deleted) {
        throw new BadRequestException(`Failed to delete project with ID ${id}`);
      }
      return result;
    } catch (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  }
}
