import { Injectable } from '@angular/core';
import { ConfigVar, StartupService } from '../app.startup.service';
import { SharedService } from '../app.service';
import { HttpService } from 'app/core/http/http.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CheckInModel } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class GroupCheckinService {
  baseUrl: string;
  constructor(private http: HttpService, private startupService: StartupService, private sharedService: SharedService) {
    this.baseUrl = startupService.getConfigVar.BaseApiUrl;
  }

  getGroupCheckin(): Observable<any> {
    const url = `${this.baseUrl}/Checkins/Groups?expand=children`;
    return this.http.disableApiPrefix().get<CheckInModel>(url, this.sharedService.getHeaderWithToken());
  }
}
