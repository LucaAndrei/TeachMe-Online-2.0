import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from 'src/app/core/models/contact';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { ChatService } from './chat.service';
import { Message } from './models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    @Input() contacts: Contact[] = [];

    private unsubscribe$ = new Subject<void>();
    user: User;
    messages: Message[] = [];
    selectedContact: Contact = null;
    minimized = false;

    constructor(private userService: UserService, private chatService: ChatService) { }

    ngOnInit() {
        this.user = this.userService.currentUser;
    }

    onContactSelect(contact: User) {
        this.selectedContact = contact;

        // get the initial chat messages
        this.chatService.getMessagesFrom(this.selectedContact.username).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(messages => {
            this.messages = messages;
        });
        // listen for incoming messages
        this.chatService.receiveMessages().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(message => {
            if (this.selectedContact !== null && this.selectedContact.username === message.from) {
                this.messages = [...this.messages, message];
            }
        })
    }

    sendMessage(text) {
        const message: Message = { from: this.user.username, to: this.selectedContact.username, text };
        this.chatService.sendMessage(message);
        this.messages = [...this.messages, message]
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
