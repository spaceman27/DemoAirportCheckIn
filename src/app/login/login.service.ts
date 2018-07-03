import { Injectable } from '@angular/core';
import { ConfigVar, StartupService } from '../app.startup.service';
import { SharedService } from '../app.service';
import { HttpService } from 'app/core/http/http.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginService {
  baseUrl: string;
  /* istanbul ignore next */
  constructor(private http: HttpService, private startupService: StartupService, private shareService: SharedService) {
    this.baseUrl = startupService.getConfigVar.BaseAuthenticationUrl;
  }
  /* istanbul ignore next */
  getSiteApi(): Observable<string[]> {
    const url = `${this.baseUrl}/SiteList`;
    return this.http.disableApiPrefix().get<string[]>(url);
  }
}
