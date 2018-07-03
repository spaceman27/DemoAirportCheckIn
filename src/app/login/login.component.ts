import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './login.service';
import { StartupService, ConfigVar } from '../app.startup.service';
import { LoaderService } from '../loader.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  lstSite: string[];
  loginFailMessage: string;
  windowsAuthEnabled: boolean; // This stores if windows authentication is enabled for the client.

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private startupService: StartupService,
    private loaderService: LoaderService) {
    this.windowsAuthEnabled = this.startupService.getConfigVar.WindowAuthentication;
    this.createForm();
  }

  ngOnInit() {
    this.loginService.getSiteApi()
    .subscribe((lstSite: string[]) => {
      this.lstSite = lstSite;
      if (lstSite.length === 1) {
        this.loginForm.controls.site.setValue(this.lstSite[0]); // Set default if there is only one site.
      }
      console.log(this.loginForm);
    });
  }

  login() {
    this.isLoading = true;
    this.loaderService.show();
    (!this.loginForm.controls.toggleSwitch.value === true ?
    this.authenticationService.login(this.loginForm.value)
    : this.authenticationService.loginWindow(this.loginForm.value))
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
        this.loaderService.hide();
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.user.key} successfully logged in`);
        if (credentials.user) {
          this.router.navigate(['/'], { replaceUrl: true });
        } else {
          // do something
          this.loginFailMessage = this.translateService.translations[this.translateService.currentLang][
            'User is not Authorized'
          ];
        }
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      site: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      toggleSwitch: [this.windowsAuthEnabled]
    });
  }

}
