import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Contact } from 'src/app/core/models/contact';
import { Message } from './models/message';
import { SOCKET_MESSAGES, SOCKET_MESSAGES_RESPONSE } from './models/socket-messages';


@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private url = 'http://localhost:3000';
    private socket;

    private username: string;

    constructor() { }

    connectSocket(username: string) {
        this.username = username;
        this.socket = io(this.url, { query: `username=${this.username}` });
    }

    disconnectSocket(callback) {
        this.socket.emit(SOCKET_MESSAGES.LOGOUT, this.username);
        this.onContactDisconnect((contact: Contact) => {
            if (contact.username === this.username) {
                this.socket.disconnect();
                callback();
            } else {
                console.warn('Other user logged out');
            }
        });
    }

    getContacts() {
        this.socket.emit(SOCKET_MESSAGES.GET_CONTACTS, this.username);
    }

    onGetAllContacts(callback) {
        this.socket.on(SOCKET_MESSAGES_RESPONSE.GET_CONTACTS_RESPONSE, (contacts: Contact[]) => callback(contacts));
    }

    onContactConnect(callback) {
        this.socket.on(SOCKET_MESSAGES_RESPONSE.CONTACT_CONNECTED, (contact: Contact) => callback(contact));
    }

    onContactDisconnect(callback) {
        this.socket.on(SOCKET_MESSAGES_RESPONSE.CONTACT_DISCONNECTED, (contact: Contact) => callback(contact));
    }

    onMessageResponse(callback) {
        this.socket.on(SOCKET_MESSAGES.RESPONSE_ADD_MESSAGE, (message: Message) => callback(message));
    }

    sendMessage(message: Message) {
        this.socket.emit(SOCKET_MESSAGES.ADD_MESSAGE, { from: message.from, to: message.to, text: message.text });
    }

    clear(socketMessage: string) {
        this.socket.removeListener(socketMessage);
    }
}
