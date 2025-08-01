import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Task } from "../../../../core/models/task.model";
import { TaskService } from "../../../../core/services/tasks.services";
import { AuthService } from "../../../../core/services/auth.services";
import { TaskFormDialogComponent } from "../task-form-dialog/task-form-dialog.component";

export function isFirestoreTimestamp(value: any): value is { _seconds: number; _nanoseconds: number } {
  return value && typeof value === 'object' && '_seconds' in value;
}
@UntilDestroy()
@Component({
    selector: "app-tasks",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
})
export class TasksComponent implements OnInit {
    tasks: Task[] = [];

    constructor(
        private taskService: TaskService,
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadTasks();
    }

loadTasks(): void {
this.taskService.getTasks().pipe(untilDestroyed(this)).subscribe({
next: (tasks) => {
this.tasks = tasks.map(task => {
  let createdAtDate: Date;

  if (isFirestoreTimestamp(task.createdAt)) {
    createdAtDate = new Date(task.createdAt._seconds * 1000);
  } else {
    createdAtDate = new Date(task.createdAt); // works for ISO string or Date
  }

  return {
    ...task,
    createdAt: createdAtDate,
  };
});
},
  error: (err) => console.error("Failed to load tasks", err),
});
}



    addTask(): void {
        this.dialog
            .open(TaskFormDialogComponent, { width: "400px" })
            .afterClosed()
            .subscribe((task: Partial<Task>) => {
                if (task) {
                    this.taskService.addTask(task).pipe(untilDestroyed(this)).subscribe({
                        next: () => this.loadTasks(),
                        error: (err) => console.error("Failed to add task", err),
                    });
                }
            });
    }

    editTask(task: Task): void {
        this.dialog
            .open(TaskFormDialogComponent, { width: "400px", data: task })
            .afterClosed()
            .subscribe((updatedTask: Task) => {
                if (updatedTask) {
                    this.taskService.updateTask(updatedTask).pipe(untilDestroyed(this)).subscribe({
                        next: () => this.loadTasks(),
                        error: (err) => console.error("Failed to update task", err),
                    });
                }
            });
    }

    toggleTaskCompletion(task: Task): void {
        const updatedTask = { ...task, completed: !task.completed };
        this.taskService.updateTask(updatedTask).pipe(untilDestroyed(this)).subscribe({
            next: () => this.loadTasks(),
            error: (err) => console.error("Failed to update task", err),
        });
    }

    deleteTask(taskId: string): void {
        this.taskService.deleteTask(taskId).pipe(untilDestroyed(this)).subscribe({
            next: () => this.loadTasks(),
            error: (err) => console.error("Failed to delete task", err),
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
