import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () => import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "tasks",
    loadChildren: () => import("./features/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];
