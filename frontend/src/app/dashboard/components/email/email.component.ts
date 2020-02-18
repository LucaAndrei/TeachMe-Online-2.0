import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
    emails: any[] = [
        {
            sender: 'Andrei',
            subject: 'Test 123',
            date: '12:43 PM',
            text: 'loremipsum'
        },
        {
            sender: 'Andrei',
            subject: 'Test 123',
            date: '12:43 PM',
            text: 'loremipsum123',
            read: true,
        },
        {
            sender: 'Andrei',
            subject: 'Test 123',
            date: '12:43 PM',
            text: 'loremipsum456'
        }
    ]

    selectedEmail: any;
    selectedRows: any[] = [];
    selectAllCheckbox = false;
    constructor(private router: Router) { }

    ngOnInit() {
        let index = 0;
        this.emails = this.emails.map(email => {
            return {
                ...email,
                id: index++,
                selected: false
            }
        })
    }

    selectEmail(email) {
        this.selectedEmail = email;
        this.router.navigate(['/app/email/1']);
    }

    checkboxClick(selectedEmail) {
        const e = this.emails.find(email => email.id === selectedEmail.id);
        e.selected = !e.selected
        this.selectedRows = this.emails.filter(email => email.selected);
        if (this.selectedRows.length === this.emails.length) {
            this.selectAllCheckbox = true;
        } else {
            this.selectAllCheckbox = false;
        }
    }

    selectAll() {
        if (this.selectedRows.length === this.emails.length) {
            this.emails = this.emails.map(email => {
                return {
                    ...email,
                    selected: false
                }
            })
            this.selectedRows = [];
        } else {
            this.emails = this.emails.map(email => {
                return {
                    ...email,
                    selected: true
                }
            })
            this.selectedRows = [...this.emails];
        }
    }

    deleteEmails() {}

}
