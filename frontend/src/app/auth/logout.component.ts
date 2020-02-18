import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }
}
