import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Answer } from './answer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(public http:HttpClient) { }

  getQuestions(): Observable<Answer[]> {
    return this.http.get<Answer[]>("/assets/questions.json")
  }
}
