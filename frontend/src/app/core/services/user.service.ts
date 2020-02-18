import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ChatService } from 'src/app/dashboard/components/chat/chat.service';
import { ROLES } from '../models/roles';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUserSubject = new BehaviorSubject<User>(null);
    public currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService, private jwtService: JwtService, private chatService: ChatService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.jwtService.getUser()));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    setAuth(user: User) {
        this.jwtService.saveToken(user.token);
        this.jwtService.saveUser(user);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        this.chatService.disconnectFromChat(() => {
            this.jwtService.clearLocalStorage();
            this.currentUserSubject.next(null);
            this.isAuthenticatedSubject.next(false);
        });
    }

    attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, { user: credentials })
            .pipe(map(
                data => {
                    this.setAuth({
                        ...data.user,
                        isAdmin: data.user.role === ROLES.ADMIN || data.user.role === ROLES.SUPER_ADMIN
                    });
                    return data;
                }
            ));
    }

    get currentUser(): User {
        return this.currentUserSubject.value;
    }

    update(user): Observable<User> {
        return this.apiService.put('/user', { user })
            .pipe(map(data => {
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }

    getAllUsers(): Observable<User[]> {
        return this.apiService.get(`/users`);
    }

    getUserForRegistrationToken(registrationToken: string) {
        return this.apiService.get(`/users/activate/${registrationToken}`);
    }

    sendRegisterLink(email: string) {
        return this.apiService.post('/emails/registration-link', { email });
    }

    updateUserRole(user: User) {
        return this.apiService.put('/user', { user })
    }

    activateAccount(credentials) {
        return this.apiService.put('/user/activate', { user: credentials });
    }
}
