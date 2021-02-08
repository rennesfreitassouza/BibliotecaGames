
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plataforms } from './../plataforms';
import { Location } from '@angular/common';
import { PlataformsService } from './../plataforms.service';


@Component({
  selector: 'app-plataforms-form',
  templateUrl: './plataforms-form.component.html',
  styleUrls: ['./plataforms-form.component.scss']
})
export class PlataformsFormComponent implements OnInit {

  form: FormGroup = new FormGroup ({
    NAME: new FormControl()
  });

  submitted = false;

  constructor(private fb: FormBuilder, private service: PlataformsService, private location: Location) { }


  ngOnInit(): void {

    this.form = this.fb.group({
      NAME: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    console.log(this.form.valid);
    let plataforms: Plataforms = { PLATAFORMS_ID: 0, NAME: this.form.value.NAME };
    if (this.form.valid){
      console.log('submit: ' + plataforms.NAME);
      this.service.create(plataforms).subscribe(
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
