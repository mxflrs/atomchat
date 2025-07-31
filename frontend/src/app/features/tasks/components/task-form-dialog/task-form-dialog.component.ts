import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "../../../../core/models/task.model";

@Component({
    selector: "app-task-form-dialog",
    templateUrl: "./task-form-dialog.component.html",
})
export class TaskFormDialogComponent {
    taskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TaskFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Task | null
    ) {
        this.taskForm = this.fb.group({
            title: [data?.title || "", [Validators.required]],
            description: [data?.description || "", [Validators.required]],
        });
    }

    onSubmit(): void {
        if (this.taskForm.valid) {
            const task: Partial<Task> = {
                ...this.taskForm.value,
                id: this.data?.id,
                completed: this.data?.completed || false,
                createdAt: this.data?.createdAt || new Date().toISOString(),
            };
            this.dialogRef.close(task);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
