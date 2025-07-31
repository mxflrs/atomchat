import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.services";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const email = this.loginForm.get("email")?.value;
            this.authService.login(email).subscribe({
                next: (success) => {
                    if (success) {
                        this.router.navigate(["/tasks"]);
                    } else {
                        this.dialog
                            .open(CreateUserDialogComponent, { data: { email } })
                            .afterClosed()
                            .subscribe((create) => {
                                if (create) {
                                    this.authService.register(email).subscribe(() => {
                                        this.router.navigate(["/tasks"]);
                                    });
                                }
                            });
                    }
                },
                error: (err) => {
                    this.errorMessage = err.error?.error || "Login failed";
                },
            });
        }
    }
}
