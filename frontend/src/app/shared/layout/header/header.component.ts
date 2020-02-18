import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { LayoutService } from 'src/app/core/services/layout.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    private unsubscribe$ = new Subject<void>();
    showHeader$ = this.layoutService.showHeader$;
    constructor(private layoutService: LayoutService, private userService: UserService) { }

    currentUser: User;
    ngOnInit() {
        this.userService.currentUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
