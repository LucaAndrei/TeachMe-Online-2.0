import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { EmailService } from '../email.service';

@Component({
    selector: 'app-email-compose',
    templateUrl: './email-compose.component.html',
    styleUrls: ['./email-compose.component.scss']
})
export class EmailComposeComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();
    user: User;
    isSubmitting = false;
    htmlContent;

    emailForm: FormGroup;

    editorConfig = {
        'height': '300px',
        'width': '100%',
        'minWidth': '100%',
        'toolbar': [
            ['bold', 'italic', 'underline', 'strikeThrough'],
            ['fontSize'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull']
        ]
    }
    constructor(private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
        private emailService: EmailService
    ) {
    }

    ngOnInit() {
        this.user = this.userService.currentUser;

        this.emailForm = this.fb.group({
            'from': [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
            'to': ['', [Validators.required, Validators.email]],
            'subject': ['', Validators.required],
            'content': ['', Validators.required]
        });
    }

    send() { }

    get f() { return this.emailForm.controls; }

    submitForm() {
        this.isSubmitting = true;
        const formValues = this.emailForm.value;

        this.emailService.sendMail(formValues.to, formValues.subject, formValues.content)
            .pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
                this.isSubmitting = false;
            }, err => {
                this.isSubmitting = false;
            })
    }

    back() {
        this.router.navigate(['/app/email'])
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
