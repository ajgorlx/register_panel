import { inject } from "@angular/core"
import { AuthenticationService } from "./authentication.service"
import { Router } from "@angular/router";

export const AuthGuard = () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

  
}