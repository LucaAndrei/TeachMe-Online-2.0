import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <ng-http-loader
            [backgroundColor]="'#e74a3b'"
            spinner="sk-wave"
            [debounceDelay]="100"
            [minDuration]="300"
            [extraDuration]="300">
        </ng-http-loader>

        <app-header></app-header>

        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'teachme';

    constructor() { }
}
