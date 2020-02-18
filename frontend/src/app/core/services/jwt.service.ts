import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor(private $localStorage: LocalStorageService) { }

    getToken(): String {
        return this.$localStorage.retrieve('authenticationToken');
    }

    saveToken(token: String) {
        this.$localStorage.store('authenticationToken', token);
    }

    getUser() {
        return this.$localStorage.retrieve('jwtUser');
    }

    saveUser(user: User) {
        this.$localStorage.store('jwtUser', JSON.stringify(user))
    }

    clearLocalStorage() {
        this.$localStorage.clear('authenticationToken');
        this.$localStorage.clear('jwtUser');
    }

    private getTokenExpirationDate(token: String): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        return date === undefined ? false : !(date.valueOf() > new Date().valueOf());
    }

}
