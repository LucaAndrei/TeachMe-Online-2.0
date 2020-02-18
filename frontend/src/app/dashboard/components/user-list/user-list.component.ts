import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROLES } from 'src/app/core/models/roles';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    private unsubscribe$ = new Subject<void>();
    isSubmitting = false;
    email = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    users: User[] = [];
    roles = Object.values(ROLES);

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAllUsers().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
            this.users = data;
        })
    }

    sendRegisterLink() {
        this.isSubmitting = true;
        this.userService.sendRegisterLink(this.email.value).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
            this.email.reset();
            this.isSubmitting = false;
        }, err => {
            this.email.reset();
            this.isSubmitting = false;
        })
    }

    changeRole(user: User, role: string) {
        user.role = role;
        this.userService.updateUserRole(user).pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
