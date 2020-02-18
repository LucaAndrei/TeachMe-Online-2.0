import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Message } from '../models/message';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html'
})
export class ChatBoxComponent implements OnChanges {
    @Input() messages: Message[];
    @Input() recipient: User;
    @Input() user: User;
    @Output() back: EventEmitter<any> = new EventEmitter<any>();
    @Output() onMinimize: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSendMessage: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('messageThread', { static: true }) private messageContainer: ElementRef;

    text: string = null;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.messages && changes.messages.currentValue) {
            this.scrollMessageContainer();
        }
    }

    sendMessage(event) {
        if (event.keyCode === 13) {
            const text = this.text.trim();
            if (this.text === '' || this.text === undefined || this.text === null) {
                alert(`Message can't be empty.`);
            } else {
                this.onSendMessage.emit(text);
                this.text = null;
                this.scrollMessageContainer();
            }
        }
    }

    scrollMessageContainer(): void {
        if (this.messageContainer !== undefined) {
            try {
                setTimeout(() => {
                    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
                }, 100);
            } catch (error) {
                console.warn(error);
            }
        }
    }
}
