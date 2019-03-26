import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      region: new FormControl(''),
      type: new FormControl('')
    });
  }

  register() {
    console.log("register form", this.registerForm.value);
    this._utilsService.addUser(this.registerForm.value)
      .then(data => {
        alert('registration success');
        console.log("data", data);
      })
      .catch(e => {
        alert('registration failed');
      })
  }

}
