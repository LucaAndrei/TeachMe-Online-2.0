import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-card',
    templateUrl: './test-card.component.html',
    styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent implements OnInit {

    @Input() title = '';
    @Input() description = '';
    @Input() type = 'assignment';
    @Input() route = '';
    @Input() set dueDate(_dueDateText) {
        this._dueDateText = _dueDateText;
        if (this.type === 'assignment') {
            // condition should be based on the due date
            this.disabled = true;
        } else {
            this.disabled = false;
        }
    };

    get dueDate() {
        return this._dueDateText;
    }

    disabled = false;
    private _dueDateText = ''

    constructor() { }

    ngOnInit() {
    }

}
