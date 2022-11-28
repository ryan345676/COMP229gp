import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { EasySurveyModule } from "./easySurvey/easySurvey.module";
import { EasySurveyComponent } from "./easySurvey/easySurvey.component";
import { AnswerComponent } from "./easySurvey/answer.component";
import { SurveyInfoDetailComponent } from "./easySurvey/surveyInfoDetail.component";
import { RouterModule } from "@angular/router";
import { EasySurveyFirstGuard } from "./easySurveyFirst.guard";
@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [BrowserModule, EasySurveyModule, RouterModule.forRoot([
      { path: "easySurvey", component: EasySurveyComponent,
      canActivate: [EasySurveyFirstGuard]
    },
      { path: "surveyInfo", component: SurveyInfoDetailComponent,
      canActivate: [EasySurveyFirstGuard]
    },
      { path: "answer", component: AnswerComponent,
      canActivate: [EasySurveyFirstGuard]
    },
    {
      path: "admin",
      loadChildren: () => import("./admin/admin.module")
          .then(m => m.AdminModule),
      canActivate: [EasySurveyFirstGuard]
  },
      { path: "**", redirectTo: "/easySurvey" }
  ])],
     providers: [EasySurveyFirstGuard],
    //declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
