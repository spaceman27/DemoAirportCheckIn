import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginToken, ILoginToken, LoginContext, Credentials } from './login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService, ConfigVar } from '../../app.startup.service';
import { SharedService } from '../../app.service';
import { catchError, retry, map, filter, switchMap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'token'
  })
};

const keyRole = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private baseUrl: string;
  private _credentials: ILoginToken | null;
  private userCredential: LoginToken;
  private isAdmin: boolean;
  private tokenPayload: any;


  constructor(private http: HttpClient, private startupService: StartupService, private sharedService: SharedService) {
    this.baseUrl = startupService.getConfigVar.BaseAuthenticationUrl;
    this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey));
  }
   /* istanbul ignore next */
   refreshToken(): Observable<ILoginToken> {
    // console.log(option);
    const url = `${this.baseUrl}/RefreshLogin`;
    return this.http.disableApiPrefix().post(url, null, this.sharedService.getHeaderWithToken())
             .pipe(map((body: any) =>  {
               this.setCredentials(body);
               return body;
             } )
            );
  }
  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<ILoginToken> {
    const url = `${this.baseUrl}/login?site=${context.site}`;
    return this.http.disableApiPrefix().post<ILoginToken>(url, JSON.stringify({'UserName': context.username, 'Password': context.password}),
              {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                responseType: 'json'
              })
             .pipe(map((body: any) =>  {
                // const token = body.token;
                // this.tokenPayload = jwtDecode(token);
                 this.setCredentials(body);
                return body;
              })
            );
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  loginWindow(context: LoginContext): Observable<ILoginToken> {
    const url = `${this.baseUrl}/windowsLogin?site=${context.site}`;
    return this.http.disableApiPrefix().post<ILoginToken>(url, null, this.sharedService.getHeaderWithCredential())
              .pipe(map(
                (body: any) => {
                  this.setCredentials(body);
                  return body;
                }
              ));
  }
  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }
  /* istanbul ignore next */
  isAdminRole(): boolean  {
    // should get from this._credentials.token, parse json take time
    const payload = jwtDecode(JSON.parse(sessionStorage.credentials).token);
    return payload[keyRole] === 'admin' || payload[keyRole].indexOf('admin') !== -1;
  }
  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): ILoginToken | null {
    return this._credentials;
  }

   /* istanbul ignore next */
   getIPAddress(): string {
    // should get from this._credentials.token, parse json take time
    const payload = jwtDecode(JSON.parse(sessionStorage.credentials).token);
    return payload['IPAddress'];
  }
   /* istanbul ignore next */
   getComputerName(): string {
    // should get from this._credentials.token, parse json take time
    const payload = jwtDecode(JSON.parse(sessionStorage.credentials).token);
    return payload['hostName'];
  }
  /* istanbul ignore next */
  getTokenPayload() {
    return jwtDecode(JSON.parse(sessionStorage.credentials).token);
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: ILoginToken, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const currentTime = new Date();
      credentials.expiration = new Date(currentTime.getTime() + credentials.minutesValid * 60 * 1000);
      const storage = sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
    }
  }

}
