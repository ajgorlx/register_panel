import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { from, map, switchMap } from "rxjs";
import { UsersService } from "./users.service";

export const AuthGuard = () => {
    const userService = inject(UsersService);
    const router = inject(Router);
        return from(userService.isAdmin().pipe(
            switchMap(isAdmin => {
                if (isAdmin) {
                    return [true];
                } else {
                    router.navigate(['/home'])
                    return [false]
                }
            })
        ))
      }

  
