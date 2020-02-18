import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from 'src/app/core/models/contact';
import { ApiService } from 'src/app/core/services/api.service';
import { Message } from './models/message';
import { SOCKET_MESSAGES, SOCKET_MESSAGES_RESPONSE } from './models/socket-messages';
import { SocketService } from './socket.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private username;
    private contacts: Contact[] = [];


    private contactsSubject = new BehaviorSubject<Contact[]>([]);
    public contacts$ = this.contactsSubject.asObservable();//.pipe(distinctUntilChanged());





    constructor(private apiService: ApiService, private socketService: SocketService) {

    }

    connectToChat(username: string) {
        this.username = username;
        this.socketService.connectSocket(this.username);
    }

    disconnectFromChat(callback) {
        this.socketService.disconnectSocket(callback);
    }

    getContacts() {
        if (this.username !== null) {
            this.socketService.getContacts();
        }
        this.contacts$ = new Observable<Contact[]>(observer => {
            this.socketService.onContactConnect((contact: Contact) => {
                if (contact.username !== this.username) {
                    this.contacts = this.contacts.map(c => {
                        if (c.username === contact.username) {
                            return contact;
                        }
                        return c;
                    })

                    observer.next(this.contacts);
                }
            });

            this.socketService.onContactDisconnect((contact: Contact) => {
                if (contact.username !== this.username) {
                    this.contacts = this.contacts.map(c => {
                        if (c.username === contact.username) {
                            return contact;
                        }
                        return c;
                    })

                    observer.next(this.contacts);
                }
            });

            this.socketService.onGetAllContacts((contacts: Contact[]) => {
                this.contacts = [...contacts];
                observer.next(this.contacts);
            })
            return () => {
                this.socketService.clear(SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE);
                this.socketService.clear(SOCKET_MESSAGES_RESPONSE.CONTACT_CONNECTED);
                this.socketService.clear(SOCKET_MESSAGES_RESPONSE.CONTACT_DISCONNECTED);
            }
        });
        return this.contacts$;
    }

    getMessagesFrom(fromUsername: string): Observable<Message[]> {
        return this.apiService.post('/messages', { from: fromUsername, to: this.username });
    }

    receiveMessages() {
        return new Observable<Message>(observer => {
            this.socketService.onMessageResponse((message: Message) => {
                observer.next(message);
            })
            return () => {
                this.socketService.clear(SOCKET_MESSAGES.RESPONSE_ADD_MESSAGE);
            }
        })
    }

    sendMessage(message: Message) {
        this.socketService.sendMessage(message);
    }
}
