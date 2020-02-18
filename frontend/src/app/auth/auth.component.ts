import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Errors } from 'src/app/core/models/errors';
import { ROLES } from 'src/app/core/models/roles';
import { User } from 'src/app/core/models/user';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();
    private user: User;
    authType: string = '';
    title: string = '';
    btnTitle: string = '';
    errors: Errors = { errors: {} };
    isSubmitting = false;
    userForm: FormGroup;

    bgClass: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        private layoutService: LayoutService,
        private navigationService: NavigationService
    ) {
        this.user = this.userService.currentUser;
        if (this.user && this.user.isValidated) {
            this.router.navigate(['/']);
        } else {
            /*
                Password validators
                Validators.compose([Validators.pattern(/[0-9]+/), Validators.pattern(/[a-z]+/), Validators.minLength(5), Validators.required])
			)*/
            this.userForm = this.fb.group({
                'email': ['', [Validators.required, Validators.email]],
                'password': ['', Validators.required]
            });
        }
    }

    ngOnInit() {
        this.layoutService.showHeader(false);
        this.route.url.pipe(takeUntil(this.unsubscribe$)).subscribe(url => {
            this.authType = url[0].path;

            this.setFormTexts(this.authType);

            if (this.authType === 'register') {
                this.userForm.addControl('username', new FormControl());
            } else if (this.authType === 'activate') {
                const token = url[1].path;
                this.userService.getUserForRegistrationToken(token).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
                    this.user = user;
                    if (this.user.isValidated) {
                        this.router.navigate(['/']);
                    } else {
                        this.userForm.patchValue({ email: user.email });
                        this.userForm.get('email').disable();
                    }
                })
            }
        });
    }

    submitForm() {
        this.isSubmitting = true;
        this.errors = { errors: {} };

        const credentials = this.userForm.getRawValue();

        let response$: Observable<User>;
        if (this.authType === 'activate') {
            response$ = this.userService.activateAccount(credentials);
        } else {
            response$ = this.userService.attemptAuth(this.authType, credentials);
        }
        response$.pipe(takeUntil(this.unsubscribe$)).subscribe(
            data => {
                if (this.navigationService.hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)) {
                    this.router.navigateByUrl('/app/dashboard');
                } else {
                    this.router.navigateByUrl('/app/email');
                }
            },
            err => {
                this.errors = err;
                this.isSubmitting = false;
            }
        );
    }

    get f() { return this.userForm.controls; }

    private setFormTexts(authType: string) {
        this.bgClass = `bg-${authType}-image`;
        if (authType === 'login') {
            this.title = 'Welcome Back!';
            this.btnTitle = 'Login';

        } else if (authType === 'register') {
            this.title = 'Create an Account!';
            this.btnTitle = 'Register';
            this.userForm.addControl('username', new FormControl());
        } else if (authType === 'activate') {
            this.title = 'Activate Account';
            this.btnTitle = 'Activate';
        }
    }

    ngOnDestroy() {
        this.layoutService.showHeader(true);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
