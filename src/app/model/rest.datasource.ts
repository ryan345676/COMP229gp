import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Survey } from "./survey.model";
import { SurveyInfo } from "./surveyInfo.model";
import { Answer } from "./answer.model";
import { map, switchMap } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "http";
const PORT = 3500;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.baseUrl + "surveys");
  }
  saveAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.baseUrl + "answers", answer);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + "login", {
        name: user, password: pass
    }).pipe(map(response => {
        this.auth_token = response.success ? response.token : null;
        return response.success;
    }));
}
saveSurvey(survey: Survey): Observable<Survey> {
  return this.http.post<Survey>(this.baseUrl + "surveys",
      survey, this.getOptions());
}
updateSurvey(survey: Survey): Observable<Survey> {
  return this.http.put<Survey>(`${this.baseUrl}surveys/${survey.id}`,
      survey, this.getOptions());
}
deleteSurvey(id: number): Observable<Survey> {
  return this.http.delete<Survey>(`${this.baseUrl}surveys/${id}`,
      this.getOptions());
}
getAnswers(): Observable<Answer[]> {
  return this.http.get<Answer[]>(this.baseUrl + "answers", this.getOptions());
}
deleteAnswer(id: number): Observable<Answer> {
  return this.http.delete<Answer>(`${this.baseUrl}answers/${id}`,
      this.getOptions());
}
updateAnswer(answer: Answer): Observable<Answer> {
  return this.http.put<Answer>(`${this.baseUrl}answers/${answer.id}`,
      answer, this.getOptions());
}
private getOptions() {
  return {
      headers: new HttpHeaders({
          "Authorization": `Bearer<${this.auth_token}>`
      })
  }
}
}
