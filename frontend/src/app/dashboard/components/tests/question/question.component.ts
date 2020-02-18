import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../models/question';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent {
    @Input() question: Question;
    @Output() onOptionSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    onOptionSelect(option) {
        this.onOptionSelected.emit({
            question: this.question,
            option
        })
    }
}
