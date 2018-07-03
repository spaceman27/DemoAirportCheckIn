import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng2Webstorage } from 'ngx-webstorage';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';



import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartupService } from './app.startup.service';
import { SharedService } from './app.service';
import { LoaderService } from './loader.service';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return (environment.production ? '' : 'missing translation for ') + params.key;
    }
}
export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: !environment.production }),
    FormsModule,
    HttpClientModule,
    Ng2Webstorage,
    TranslateModule.forRoot({
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      useDefaultLang: false
    }),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    LoginModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AppComponent],
  providers: [
    SharedService,
    StartupService,
    LoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
