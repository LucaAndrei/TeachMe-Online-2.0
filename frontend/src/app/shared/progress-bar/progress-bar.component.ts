import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

    fillPercentage = 0;
    private _steps = 0;
    @Input() completedSteps: any[];
    @Input() currentQuestionIndex: number;
    @Input() set steps(_steps: number) {
        this._steps = _steps;
    }

    get progressBarSteps() {
        let arr = [];
        for (let i = 0; i < this._steps; i++) {
            arr.push(i);
        }
        return arr;
    }
    constructor() { }

    ngOnInit() {

    }
}
