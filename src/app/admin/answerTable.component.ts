import { Component } from "@angular/core";
import { Answer } from "../model/answer.model";
import { AnswerRepository } from "../model/answer.repository";
@Component({
    templateUrl: "answerTable.component.html"
})
export class AnswerTableComponent { 
    includeConfirmed = false;
    constructor(private repository: AnswerRepository) {}
    getAnswers(): Answer[] {
        return this.repository.getAnswers()
            .filter(o => this.includeConfirmed || !o.confirmed);
    }
    markConfirmed(answer: Answer) {
        answer.confirmed = true;
        this.repository.updateAnswer(answer);
    }
    delete(id: number) {
        this.repository.deleteAnswer(id);
    }
}