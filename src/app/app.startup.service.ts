/* istanbul ignore next */
import { Injectable } from '@angular/core';
import { SharedService } from './app.service';
import { HttpService } from 'app/core/http/http.service';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as xml2js from 'xml-js';

// import * as x2js from 'xml2js';
export class ConfigVar {
  BaseApiUrl: string;
  BaseAuthenticationUrl: string;
  WindowAuthentication: boolean;
/* istanbul ignore next */
  static copyFrom(obj: any): ConfigVar {
    const ret = new ConfigVar();
    ret.BaseApiUrl = obj.BaseApiUrl;
    ret.WindowAuthentication = obj.WindowAuthentication.toLowerCase() === 'true';
    ret.BaseAuthenticationUrl = obj.BaseAuthenticationUrl;
    return ret;
  }
}

@Injectable()
export class StartupService {
    get getConfigVar(): ConfigVar {
      return JSON.parse(sessionStorage.getItem('configVarCheckin'));
    }

/* istanbul ignore next */
    constructor(private http: HttpService, private shareService: SharedService) { }

    /* istanbul ignore next */
    load() {
        let url = location.pathname.replace('index.html', '');
        if (environment.production) {
          url = `${url}assets/appsettings.xml`;
        } else {
          url = 'assets/appsettings.dev.xml';
        }
        this.http.disableApiPrefix().get(url, {
          headers: new HttpHeaders({
              'Content-Type': 'application/xml',
              'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': 'Sat, 01 Jan 2040 00:00:00 GMT'
          }),
          responseType: 'text'
        }).
        subscribe(
        (res: any) => {
          const obj = xml2js.xml2json(res);
          let configVar = {};
          JSON.parse(obj)['elements'][0].elements.forEach( (r: any) => {
            configVar[r['name']]  = r['elements'][0].text;
          });
          configVar = ConfigVar.copyFrom(configVar);
          sessionStorage.setItem('configVarCheckin', JSON.stringify(configVar));

          console.log('xml loaded');
        },
        (error: any) => {
          console.log(error);
        });
    }
}
