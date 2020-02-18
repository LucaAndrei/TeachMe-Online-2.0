import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/core/models/contact';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
    @Input() contacts: Contact[];
    @Output() onContactSelect: EventEmitter<Contact> = new EventEmitter<Contact>();
    @Output() onMinimize: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }
}
