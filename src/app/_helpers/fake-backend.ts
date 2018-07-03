import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get templates
            if (request.url.endsWith('mock/checkin/template') && request.method === 'GET') {

                if (1 === 1) {
                    const body = [
                        {
                            id: 1,
                            key: 'template 1',
                            fields: {
                                startdate: [{}]
                            }
                        },
                        {
                            id: 2,
                            key: 'template 2',
                            fields: {
                                startdate: [{}]
                            }
                        },
                        {
                            id: 3,
                            key: 'template 3',
                            fields: {
                                startdate: [{}]
                            }
                        }
                    ];

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'get templates throw exception' } });
                }
            }

            // get available templates
            if (request.url.endsWith('mock/checkin/availabletemplates') && request.method === 'GET') {

                if (1 === 1) {
                    const body = {
                        availableFields: [
                            {
                                name: 'startdate',
                                defaultValue: '0',
                                type: 'date',
                                caption: 'startDate'
                            }
                        ]
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'get templates throw exception' } });
                }
            }

            // get available templates
            if (request.url.endsWith('mock/checkin/flights') && request.method === 'GET') {

                if (1 === 1) {
                    const body = [
                        {}
                    ];

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'get templates throw exception' } });
                }
            }
            // get available templates
            if (request.url.endsWith('mock/checkin/locationvalue') && request.method === 'GET') {
                if (1 === 1) {
                    const body = [
                        {}
                    ];
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'get location value throw exception' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(100))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
