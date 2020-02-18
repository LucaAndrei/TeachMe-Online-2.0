import { Component } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    showHeader$ = this.layoutService.showHeader$;
    constructor(private layoutService: LayoutService) { }
}