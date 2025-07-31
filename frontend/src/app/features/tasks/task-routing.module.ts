import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../../core/guards/auth.guard";
import { TasksComponent } from "./components/task/task.component";

const routes: Routes = [
    { path: "tasks", component: TasksComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule {}
