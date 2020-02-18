import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() route: string = null;
    @Input() disabled = false;
    @Input() btnClass = '';
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }
}
