import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-email-details',
    templateUrl: './email-details.component.html',
    styleUrls: ['./email-details.component.scss']
})
export class EmailDetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const emailId = this.route.snapshot.params.id;
        // get email by id
    }

    back() {
        this.router.navigate(['/app/email'])
    }
    reply() {}

    delete() {}

}
