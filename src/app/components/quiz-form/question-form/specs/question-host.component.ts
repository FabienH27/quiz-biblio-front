import { Component, inject } from "@angular/core";
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { QuizFormService } from "../../../../services/quiz-form.service";
import { QuestionFormComponent } from "../question-form.component";

@Component({
    template: `<form [formGroup]="form">
        @for(proposal of questions.controls; track $index) {
          <app-create-question [questionIndex]="$index" />
        }
      </form>`,
    imports: [QuestionFormComponent, ReactiveFormsModule]
})
export class QuestionHostComponent {
  
    quizFormService = inject(QuizFormService);
  
    form = new FormGroup({
        questions: new FormArray([
            this.quizFormService.createQuestionForm()
        ])
    });

    get questions() {
        return this.form.get('questions') as FormArray;
    }
}