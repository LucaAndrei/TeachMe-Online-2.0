import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Message } from '../../models/message';

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {

    @Input() user: User;
    @Input() message: Message;
    constructor() { }
}
