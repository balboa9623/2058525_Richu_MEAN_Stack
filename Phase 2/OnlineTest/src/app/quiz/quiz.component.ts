import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Answer } from '../answer.model';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  allQuestions: Array<Answer> = [];

  score:number = 0;

  pageSlice: Array<Answer> = [];

  selectedAnswer: string = ";"

  reviewMode: boolean = false;
  reviewConfirmation:boolean = false;

  constructor(public ansService: AnswerService) { }

  ngOnInit(): void {
    alert("If you see an empty screen, please select items per page from the dropdown to load the questions..")
    this.ansService.getQuestions().subscribe(result =>{
      this.allQuestions = result;
    });
    this.pageSlice = this.allQuestions.slice(0, 3);
  }


  onPageChange(event: PageEvent) {
    // console.log(event);
    
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allQuestions.length) {
      endIndex = this.allQuestions.length;
    }
    this.pageSlice = this.allQuestions.slice(startIndex, endIndex);
  }
  
  checkAnswer(q: Answer, choiceSelected: string){
    // console.log(q);
    // console.log("Selected choice = " + choiceSelected);
    if(q.answer == choiceSelected){
      this.score++;
    }
    else {
      alert("Sorry. Your answer is wrong. Better luck next time")
    }
    this.allQuestions = this.allQuestions.filter(e => q != e)
    this.pageSlice = this.allQuestions;
    // console.log("score = "+ this.score);
    
    if (this.allQuestions.length == 0) {
      this.reviewMode = true;
      this.ansService.getQuestions().subscribe(result =>{
        this.allQuestions = result;
      });
    }
  }

  review() {
    this.reviewConfirmation = true;
  }

}
