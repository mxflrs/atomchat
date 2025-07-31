import { Task } from '../models/task.model';
import { db } from '../config/firebase';

type TaskWithoutId = Omit<Task, 'id'>;

export class TaskService {
  static async getTasks(userId: string): Promise<Task[]> {
    const snapshot = await db
      .collection('tasks')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Task);
  }

  static async addTask(task: TaskWithoutId): Promise<Task> {
    const docRef = await db.collection('tasks').add(task);
    return { id: docRef.id, ...task };
  }

  static async updateTask(task: Task): Promise<void> {
    const { id, ...taskData } = task;
    await db.collection('tasks').doc(id!).update(taskData);
  }

  static async deleteTask(taskId: string, userId: string): Promise<void> {
    const taskRef = db.collection('tasks').doc(taskId);
    const task = await taskRef.get();
    if (task.exists && task.data()!.userId === userId) {
      await taskRef.delete();
    } else {
      throw new Error('Unauthorized or task not found');
    }
  }
}
