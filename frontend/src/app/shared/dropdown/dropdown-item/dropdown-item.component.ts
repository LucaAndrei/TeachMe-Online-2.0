import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownItemComponent {

    @Input() route = null;
    @Input() iconClass = '';
    @Input() navigate = true;
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }
}
