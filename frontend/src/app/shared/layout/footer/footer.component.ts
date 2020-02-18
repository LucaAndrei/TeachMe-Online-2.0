import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [
        ':host { font-family: Roboto Mono, monospace }',
        'footer.sticky-footer { padding: 1rem 0; flex-shrink: 0; width: 100%; }',
        '.copyright { line-height: 1; font-size: 0.8rem; }'
    ]
})
export class FooterComponent {
    today: number = Date.now();

    constructor() { }
}
