import { inject, Injectable } from '@angular/core';
import { Role, RoleResponse } from '../types/roles';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class RbacService {

  private _roles = new Map();
  private _authenticatedUser!: User;

  httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl;

  /**
   * For each role find its parent roles and make a flat array
   * @param roles
   */
  setRoles(roles: Role[]) {    
    for (const role of roles) {
      this._roles.set(role.uid, role);
    }
  }

  getByValue(map: any, searchValue: string) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }

  /**
   * fetch all roles
   * @returns all roles
   */
  fetchRoles(): Observable<RoleResponse> {
    return this.httpClient.get<RoleResponse>(`${this.baseUrl}/rbac/roles`, {withCredentials: true})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401){
            console.warn("Token expired. Redirecting to the home page.");
          }
          return throwError(() => error);
        })
      )
  };

  /**
   * If the server returned an authenticated user,
   * then by default we will check it for access rights
   * @param user
   */
  setAuthenticatedUser(simpleUser: User) {
    this._authenticatedUser = simpleUser;
  }

  /**
   * check if the user is granted a given permission
   * @param roleOrPermission permission to have
   * @param user user on which the check is performed 
   */
  isGranted(roleOrPermission: string, user?: User): boolean {

    // if no special user is passed for checking,
    // we check the authenticated user.
    if (!user) {
      user = this._authenticatedUser;
    }

    if (!user) {
      return false;
    }

    if (!this._roles.has(user.role)) {
      return false;
    }

    return this._roles.get(user.role).uid === roleOrPermission;
  }
}
