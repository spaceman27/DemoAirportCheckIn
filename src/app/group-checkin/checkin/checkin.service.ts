import { Injectable } from '@angular/core';
import { ConfigVar, StartupService } from '../../app.startup.service';
import { SharedService } from '../../app.service';
import { HttpService } from 'app/core/http/http.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CheckInModel } from '../../app.model';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  baseUrl: string;
  constructor(private http: HttpService, private startupService: StartupService, private sharedService: SharedService) {
    this.baseUrl = startupService.getConfigVar.BaseApiUrl;
  }

  getCheckin(id: number): Observable<any> {
    const url = `${this.baseUrl}/Checkins/${id}`;
    return this.http.disableApiPrefix().get<CheckInModel>(url, this.sharedService.getHeaderWithToken());
  }

  getTemplates(): Observable<any> {
    const url = `${this.baseUrl}/mock/checkin/template`;
    return this.http.disableApiPrefix().get<any>(url, this.sharedService.getHeaderWithToken());
  }
  getFlights(): Observable<any> {
    const url = `${this.baseUrl}/mock/checkin/flights`;
    return this.http.disableApiPrefix().get<any>(url, this.sharedService.getHeaderWithToken());
  }
  getLocationValue(): Observable<any> {
    const url = `${this.baseUrl}/mock/checkin/locationvalue`;
    return this.http.disableApiPrefix().get<any>(url, this.sharedService.getHeaderWithToken());
  }
}
