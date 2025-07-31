"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const firebase_1 = require("../config/firebase");
class TaskService {
    static async getTasks(userId) {
        const snapshot = await firebase_1.db
            .collection('tasks')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
    static async addTask(task) {
        const docRef = await firebase_1.db.collection('tasks').add(task);
        return { id: docRef.id, ...task };
    }
    static async updateTask(task) {
        const { id, ...taskData } = task;
        await firebase_1.db.collection('tasks').doc(id).update(taskData);
    }
    static async deleteTask(taskId, userId) {
        const taskRef = firebase_1.db.collection('tasks').doc(taskId);
        const task = await taskRef.get();
        if (task.exists && task.data().userId === userId) {
            await taskRef.delete();
        }
        else {
            throw new Error('Unauthorized or task not found');
        }
    }
}
exports.TaskService = TaskService;
