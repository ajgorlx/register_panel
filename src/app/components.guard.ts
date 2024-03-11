import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { UsersService } from './services/users.service';

export const componentsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router,
  usersService: UsersService
) => {

    return this.usersService.getUserRole().pipe(
      map(role => {
        if (role === 'Admin') {
          return true;
        } else {
          return this.router.createUrlTree(['/home']);
        }
      })
    );
  }


