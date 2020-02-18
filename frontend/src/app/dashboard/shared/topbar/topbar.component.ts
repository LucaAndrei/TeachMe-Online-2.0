import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {

    @Input() user: User;
    @Output() onToggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    toggleSidebar() {
        this.onToggleSidebar.emit();
    }
}
