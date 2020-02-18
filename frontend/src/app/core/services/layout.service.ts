import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private showHeaderSubject = new BehaviorSubject<boolean>(true);
    public showHeader$ = this.showHeaderSubject.asObservable().pipe(distinctUntilChanged());

    private showSidebarSubject = new BehaviorSubject<boolean>(false);
    public showSidebar$ = this.showSidebarSubject.asObservable().pipe(distinctUntilChanged());

    showHeader(show: boolean) {
        this.showHeaderSubject.next(show);
    }

    toggleSidebar() {
        this.showSidebarSubject.next(!this.showSidebarSubject.value);
    }

    constructor() { }
}
