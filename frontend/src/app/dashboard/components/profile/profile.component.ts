import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    private unsubscribe$ = new Subject<void>();
    user: User = {} as User;
    settingsForm: FormGroup;
    errors: Object = {};
    isSubmitting = false;

    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {
        this.settingsForm = this.fb.group({
            image: '',
            username: '',
            email: { value: '', disabled: true },
            password: null
        });
    }

    ngOnInit() {
        Object.assign(this.user, this.userService.currentUser);
        this.settingsForm.patchValue(this.user);
    }

    submitForm() {
        this.isSubmitting = true;
        this.updateUser(this.settingsForm.value);

        this.userService
            .update(this.user)
            .pipe(takeUntil(this.unsubscribe$)).subscribe(
                updatedUser => {
                    this.isSubmitting = false;
                    this.errors = {};
                },
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
    }

    private updateUser(values: Object) {
        Object.assign(this.user, values);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
