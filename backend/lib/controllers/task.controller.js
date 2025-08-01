"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
class TaskController {
    static async getTasks(req, res) {
        try {
            const tasks = await task_service_1.TaskService.getTasks(req.user.uid);
            res.json(tasks);
        }
        catch (error) {
            console.error('Failed to fetch tasks:', error);
            res.status(500).json({ error: 'Failed to fetch tasks' });
        }
    }
    static async addTask(req, res) {
        try {
            const task = {
                ...req.body,
                userId: req.user.uid,
                createdAt: new Date(),
                completed: false,
            };
            const newTask = await task_service_1.TaskService.addTask(task);
            res.status(201).json(newTask);
        }
        catch (error) {
            console.error('Failed to add task:', error);
            res.status(500).json({ error: 'Failed to add task' });
        }
    }
    static async updateTask(req, res) {
        try {
            const task = {
                ...req.body,
                id: req.params.id,
                userId: req.user.uid,
            };
            const updatedTask = await task_service_1.TaskService.updateTask(task);
            res.json(updatedTask);
        }
        catch (error) {
            console.error('Failed to update task:', error);
            res.status(500).json({ error: 'Failed to update task' });
        }
    }
    static async deleteTask(req, res) {
        try {
            await task_service_1.TaskService.deleteTask(req.params.id, req.user.uid);
            res.status(204).send();
        }
        catch (error) {
            console.error('Failed to delete task:', error);
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
}
exports.TaskController = TaskController;
