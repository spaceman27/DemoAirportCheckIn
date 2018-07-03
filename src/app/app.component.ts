import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of, timer, observable } from 'rxjs';
import { filter, map, mergeMap, concatMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { AuthenticationService } from './core/authentication/authentication.service';
import { StartupService, ConfigVar } from './app.startup.service';
import * as moment from 'moment';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';



const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translateService: TranslateService,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private startupService: StartupService,
              private _storageService: LocalStorageService) { }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');


    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

      timer(100, 5000).pipe(map(() => {
          const now = moment();
          // only send request token if it very near redzone of expired token
          if (this.router.routerState.snapshot.url !== '/login' && this.authenticationService && this.authenticationService.credentials) {
            const dueIn = moment(this.authenticationService.credentials.expiration).diff(now, 'seconds');
            if (dueIn <= 60) {
              this.authenticationService.refreshToken()
              .subscribe(credentials => {
                console.log('token refresh has been made!!');
                console.log(credentials.expiration);
              }, error => {
                this.authenticationService.logout()
                    .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
              });
            }
          }
        })
      ).subscribe();

      // // session sync (limited by domain)
      // if (!sessionStorage['credentials']) {
      //   // Ask other tabs for session storage
      //   this._storageService.store('getSessionStorage', Date.now().toString());
      // }
      // this._storageService.observe('getSessionStorage').subscribe( (r: any) => {
      //   this._storageService.store('sessionStorage', sessionStorage['credentials']);
      //   this._storageService.clear('sessionStorage');
      //   console.log(sessionStorage['credentials']);
      // });

      // this._storageService.observe('sessionStorage').subscribe( (r: any) => {
      //   // take session data from local storage
      //   if (!sessionStorage.getItem('credentials')) {
      //     sessionStorage.setItem('credentials', r);
      //   }
      //   console.log(r);
      // });
  }

}
