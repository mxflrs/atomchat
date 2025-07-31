import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware } from './middleware/auth.middleware';
import { TaskController } from './controllers/task.controller';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Auth routes
app.post('/auth/login', AuthController.login);
app.post('/auth/register', AuthController.register);

// Task routes
app.use('/tasks', authMiddleware);
app.get('/tasks', TaskController.getTasks);
app.post('/tasks', TaskController.addTask);
app.put('/tasks/:id', TaskController.updateTask);
app.delete('/tasks/:id', TaskController.deleteTask);
export const api = functions.https.onRequest(app);