import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService } from '../authentication/authentication.service';
import { I18nService } from '../i18n.service';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isAdmin: boolean;
  ipAddress: string;
  computerName: string;
  constructor(private router: Router,
              private titleService: Title,
              private media: ObservableMedia,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) { }

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdminRole();
    this.ipAddress = this.authenticationService.getIPAddress();
    this.computerName = this.authenticationService.getComputerName();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.user.key : null;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
