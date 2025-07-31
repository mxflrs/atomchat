import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AuthRoutingModule } from "./auth-routing.module";
import { CreateUserDialogComponent } from "./components/create-user-dialog/create-user-dialog.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    declarations: [LoginComponent, CreateUserDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        AuthRoutingModule,
    ],
})
export class AuthModule {}
