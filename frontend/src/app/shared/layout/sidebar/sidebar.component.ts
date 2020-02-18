import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuTab } from 'src/app/core/models/menu-tabs';
import { User } from 'src/app/core/models/user';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

    @Input() menuTabs: MenuTab[];
    @Input() user: User;
    @Input() showSidebar = false;
    @Output() onToggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    toggleSidebar() {
        this.onToggleSidebar.emit();
    }
}
