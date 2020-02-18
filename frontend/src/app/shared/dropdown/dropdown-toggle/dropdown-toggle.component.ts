import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-dropdown-toggle',
    templateUrl: './dropdown-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownToggleComponent {

    @Input() text = '';
    constructor() { }
}
