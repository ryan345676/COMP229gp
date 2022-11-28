import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "./auth.guard";
import { SurveyTableComponent } from "./surveyTable.component";
import { SurveyEditorComponent } from "./surveyEditor.component";
import { AnswerTableComponent } from "./answerTable.component";

let routing = RouterModule.forChild([
    { path: "auth", component: AuthComponent },
    { path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
        { path: "surveys/:mode/:id", component: SurveyEditorComponent },
        { path: "surveys/:mode", component: SurveyEditorComponent },
        { path: "surveys", component: SurveyTableComponent },
        { path: "answers", component: AnswerTableComponent },
        { path: "**", redirectTo: "surveys" }
    ]},
    { path: "**", redirectTo: "auth" }
]);
@NgModule({
    imports: [CommonModule, FormsModule, routing],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent,
        SurveyTableComponent, SurveyEditorComponent, AnswerTableComponent]
})
export class AdminModule { }
