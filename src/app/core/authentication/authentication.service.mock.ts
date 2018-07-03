import { Observable, of } from 'rxjs';

import {  } from './authentication.service';
import { LoginToken, ILoginToken, LoginContext, Credentials } from './login.model';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    username: 'test',
    token: '123'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
