import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Releases } from './../releases';
import { Location } from '@angular/common';
import { ReleasesService } from './../releases.service';

@Component({
  selector: 'app-releases-form',
  templateUrl: './releases-form.component.html',
  styleUrls: ['./releases-form.component.scss']
})

export class ReleasesFormComponent implements OnInit {
  form: FormGroup = new FormGroup ({
    GAME: new FormControl(),
    PLATAFORM: new FormControl(),
    RELEASEDATE: new FormControl(),
    VERSION: new FormControl()
  });

  submitted = false;

  constructor(private fb: FormBuilder, private service: ReleasesService, private location: Location) { }


  ngOnInit(): void {

    this.form = this.fb.group({
      GAME: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      PLATAFORM: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      RELEASEDATE: [null],
      VERSION: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    console.log(this.form.valid);
    let releases: Releases = { GAME: parseInt(this.form.value.GAME),
                               PLATAFORM: parseInt(this.form.value.PLATAFORM),
                               RELEASEDATE:  new Date(this.form.value.RELEASEDATE), 
                               VERSION: parseInt(this.form.value.VERSION)
                              };
    if (this.form.valid){
      console.log('submit: ' + releases.GAME + releases.PLATAFORM + releases.RELEASEDATE + releases.VERSION);
      this.service.create(releases).subscribe(
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
