import { GamesService } from './../games.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Games } from './../games';
import { Location } from '@angular/common';

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

  constructor(private fb: FormBuilder, private service: GamesService, private location: Location) { }

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
    let games: Games = { GAMES_ID: 0, NAME: this.form.value.NAME, PUBLISHER: this.form.value.PUBLISHER };
    if (this.form.valid){
      console.log('submit: ' + games.GAMES_ID + games.NAME + games.PUBLISHER);
      this.service.create(games).subscribe(
          success => {
            console.log('Success!');
            this.location.back();
          },
          error => console.error(error),
          () => console.log('completed request')
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    console.log(this.form.reset());
  }

}