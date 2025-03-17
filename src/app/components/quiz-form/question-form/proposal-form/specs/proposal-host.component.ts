import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from "@angular/forms";
import { ProposalFormComponent } from "../proposal-form.component";

@Component({
    template: `<form [formGroup]="form">
        @for(proposal of proposals.controls; track $index) {
          <create-proposal [proposalIndex]="$index" />
        }
      </form>`,
    imports: [ProposalFormComponent, ReactiveFormsModule]
})
export class ProposalHostComponent {
    form = new FormGroup({
        proposals: new FormArray([
            new FormGroup({
                text: new FormControl('')
            })
        ])
    });

    get proposals() {
        return this.form.get('proposals') as FormArray;
    }
}