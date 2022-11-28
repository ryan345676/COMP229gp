import { Component } from "@angular/core";
import { Survey } from "../model/survey.model";
import { SurveyRepository } from "../model/survey.repository";
@Component({
    templateUrl: "surveyTable.component.html"
})
export class SurveyTableComponent {
    constructor(private repository: SurveyRepository) { }
    getSurveys(): Survey[] {
        return this.repository.getSurveys();
    }
    deleteSurvey(id: number) {
        this.repository.deleteSurvey(id);
    }
}