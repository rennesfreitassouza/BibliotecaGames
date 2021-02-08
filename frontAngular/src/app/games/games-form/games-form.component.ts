
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Games } from './../games';

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.scss']
})

export class GamesFormComponent implements OnInit {
  
  form: FormGroup = new FormGroup ({
    NAME: new FormControl(),
    PUBLISHER: new FormControl()
  });

  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      NAME: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]], //- `input (NAME, PUBLISHER);`
      PUBLISHER: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    console.log(this.form.valid);
    if (this.form.valid){
      console.log('submit');
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    console.log(this.form.reset());
  }

}