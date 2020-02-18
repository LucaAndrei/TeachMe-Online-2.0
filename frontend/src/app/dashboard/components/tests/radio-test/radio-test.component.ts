import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';

@Component({
    selector: 'app-radio-test',
    templateUrl: './radio-test.component.html'
})
export class RadioTestComponent implements OnInit {
    questions: Question[] = [
        {
            question: "Characterized by skill at understanding and profiting by circumstances",
            options: ["Prescient", "Analyst", "Diminution", "Shrewd"],
            answer: "Shrewd",
            category: 1
        },
        {
            question: "To refuse to acknowledge as one's own or as connected with oneself",
            options: ["Prevalent", "Disown", "Squalid", "Employee"],
            answer: "Disown",
            category: 2
        },
        {
            question: "Not having the abilities desired or necessary for any purpose",
            options: ["Incompetent", "Impoverish", "Coxswain", "Devious"],
            answer: "Incompetent",
            category: 3
        },
        {
            question: "Lizard that changes color in different situations",
            options: ["Scruple", "Depredation", "Chameleon", "Whimsical"],
            answer: "Chameleon",
            category: 1
        },
        {
            question: "Having the title of an office without the obligations",
            options: ["Reciprocal", "Unsullied", "Titular", "Inflated"],
            answer: "Titular",
            category: 2
        },
        // {
        //     question: "An expression of disapproval or blame personally addressed to one censured",
        //     options: ["Pitiful", "Reproof", "Mutation", "Raillery"],
        //     answer: "Reproof",
        //     category: 3
        // },
        // {
        //     question: "To deliver an elaborate or formal public speech.",
        //     options: ["Orate", "Magician", "Access", "Guzzle"],
        //     answer: "Orate",
        //     category: 2
        // },
        // {
        //     question: "A wharf or artificial landing-place on the shore of a harbor or projecting into it",
        //     options: ["Intolerable", "Quay", "Fez", "Insatiable"],
        //     answer: "Quay",
        //     category: 3
        // },
        // {
        //     question: "Friendly counsel given by way of warning and implying caution or reproof",
        //     options: ["Credence", "Colloquy", "Abyss", "Monition"],
        //     answer: "Monition",
        //     category: 1
        // },
        // {
        //     question: "To make a beginning in some occupation or scheme",
        //     options: ["Muster", "Embark", "Ocular", "Apprehensible"],
        //     answer: "Ocular",
        //     category: 2
        // },
        // {
        //     question: "Able to reinforce sound by sympathetic vibrations",
        //     options: ["Resonance", "Clandestine", "Diffusion", "Quietus"],
        //     answer: "Resonance",
        //     category: 3
        // },
        // {
        //     question: "To send off or consign, as to an obscure position or remote destination",
        //     options: ["Monolith", "Endurable", "Efficient", "Relegate"],
        //     answer: "Relegate",
        //     category: 1
        // }
    ];

    currentQuestionIndex = 0;
    currentQuestion: Question = null;
    answers: any[] = [];
    wrongAnswers: number = 0;
    correctAnswers: number = 0;
    isSubmitted = false;

    constructor() { }

    nextQuestion() {
        this.currentQuestion = this.questions[++this.currentQuestionIndex];
    }

    ngOnInit() {
        this.initQuiz();
    }

    private initQuiz() {
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        this.answers = [];
        this.wrongAnswers = 0;
        this.correctAnswers = 0;
        this.isSubmitted = false;

        this.questions = this.shuffleArray(this.questions);
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.answers = Array(this.questions.length).fill(null);
    }

    onOptionSelect({ question, option }) {
        const questionIndex = this.questions.findIndex(q => q.question === question.question);
        const correct = this.questions.find(q => q.question === question.question).answer;
        this.answers[questionIndex] = {
            index: this.currentQuestionIndex,
            question: this.questions[this.currentQuestionIndex].question,
            clicked: option,
            iscorrect: (option == correct) ? true : false,
            answer: correct,
            category: this.questions[this.currentQuestionIndex].category
        };
    }
    submitQuiz() {
        this.isSubmitted = true;
        this.correctAnswers = this.answers.filter(answer => answer.iscorrect).length;
        this.wrongAnswers = this.answers.filter(answer => !answer.iscorrect).length;
    }
    replay() {
        this.initQuiz();
    }

    /** Random shuffle questions **/
    private shuffleArray(question) {
        var shuffled = question.sort(function () {
            return .5 - Math.random();
        });
        return shuffled;
    }
}