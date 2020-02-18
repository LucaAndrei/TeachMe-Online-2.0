import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Contact } from '../core/models/contact';
import { MenuTab } from '../core/models/menu-tabs';
import { User } from '../core/models/user';
import { LayoutService } from '../core/services/layout.service';
import { NavigationService } from '../core/services/navigation.service';
import { UserService } from '../core/services/user.service';
import { ChatService } from './components/chat/chat.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject<void>();
    menuTabs: MenuTab[] = [];
    activeMenuTab: MenuTab;
    showSidebar$ = this.layoutService.showSidebar$;
    currentUser: User;
    displayChat = false;

    contacts: Contact[] = [];

    constructor(private layoutService: LayoutService,
        private router: Router,
        private navigationService: NavigationService,
        private userService: UserService,
        private chatService: ChatService) { }


    ngOnInit() {
        this.setPageTitle();
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.setPageTitle();
        });

        this.layoutService.showHeader(false);
        this.userService.currentUser$.pipe(
            takeUntil(this.unsubscribe$),
            filter(user => user !== null)).subscribe(user => {
                this.currentUser = user;
                this.menuTabs = this.navigationService.getMenuTabs();
                this.chatService.connectToChat(this.currentUser.username);
                this.chatService.getContacts().pipe(takeUntil(this.unsubscribe$)).subscribe(contacts => {
                    this.contacts = contacts;
                });
            });
    }

    ngOnDestroy() {
        this.layoutService.showHeader(true);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onToggleSidebar() {
        this.layoutService.toggleSidebar();
    }

    private setPageTitle() {
        const splitUrl = this.router.url.split('/');
        const routeTab = splitUrl[splitUrl.length - 1];
        this.activeMenuTab = this.navigationService.getTab(routeTab);
    }
}
