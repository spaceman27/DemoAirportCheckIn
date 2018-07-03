import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, retry, map, filter, switchMap } from 'rxjs/operators';

export interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnChanges {
  breadcrumbs$: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: any) =>  this.buildBreadCrumb(this.activatedRoute.root))
    );
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {}

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}

}
