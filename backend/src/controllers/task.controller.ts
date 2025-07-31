import { Response } from 'express';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { AuthRequest } from '../middleware/auth.middleware';

export class TaskController {
  static async getTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await TaskService.getTasks(req.user!.uid);
      res.json(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  static async addTask(req: AuthRequest, res: Response) {
    try {
      const task: Task = {
        ...req.body,
        userId: req.user!.uid,
        createdAt: new Date(),
        completed: false,
      };
      const newTask = await TaskService.addTask(task);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Failed to add task:', error);
      res.status(500).json({ error: 'Failed to add task' });
    }
  }

  static async updateTask(req: AuthRequest, res: Response) {
    try {
      const task: Task = {
        ...req.body,
        id: req.params.id,
        userId: req.user!.uid,
      };
      const updatedTask = await TaskService.updateTask(task);
      res.json(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response) {
    try {
      await TaskService.deleteTask(req.params.id, req.user!.uid);
      res.status(204).send();
    } catch (error) {
      console.error('Failed to delete task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}
