import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(private apiService: ApiService, private userService: UserService) { }

    sendMail(to: string, subject: string, text: string) {
        return this.apiService.post('/emails', { from: this.userService.currentUser, to, subject, text })
            .pipe(map(
                data => {
                    return data;
                }
            ));

    }
}
