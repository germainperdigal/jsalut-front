import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  /** Is club authenticated */
  public isClubAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.role === 'CLUB' && !this.jwtHelper.isTokenExpired(token);
  }

  /** Is juror authenticated */
  public isJurorAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.role === 'JUROR' && !this.jwtHelper.isTokenExpired(token);
  }

  /** Is admin authenticated */
  public isAdminAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken)
    return decodedToken.role === 'ADMIN' && !this.jwtHelper.isTokenExpired(token);
  }

  public getRole(token: string): string
  {
    return this.jwtHelper.decodeToken(token)?.role;
  }
}
