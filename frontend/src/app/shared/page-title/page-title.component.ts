import { Component } from '@angular/core';

@Component({
    selector: 'app-page-title',
    template: '<h1 class="h3 mb-4 text-gray-800"><ng-content></ng-content></h1>'
})
export class PageTitleComponent {

    constructor() { }
}
