
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SharedService {
    getHeaderWithToken() {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('credentials')).token
            })
          };
        return httpOptions;
    }

    getHeaderWithCredential() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
          };
        return httpOptions;
    }
    getHeader() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'json'
          };
        return httpOptions;
    }
}
