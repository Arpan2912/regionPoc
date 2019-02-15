import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { UtilsService } from '../utils.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm;
  country;
  constructor(
    private _utilsService: UtilsService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      region: new FormControl(''),
    });
  }

  ngOnInit() {
   
  }

  login() {
   
    this._utilsService.login(this.loginForm.value)
      .then(data => {
        let self = this;
        console.log("data", data);
        let res = JSON.parse(data['_body']);
        console.log("res", res.name, res.region);
        this.country = res.region;
        const socket = io(`http://localhost:3000?name=${res.name}&region=${res.region}`);

        socket.on('connect', function (err, io) {
      
          // socket.on('admin', (data) => {
          //   self.count = data;
          //   console.log("data", data);
          //   console.log("err", err);
          // })
        });
      })

  }
}

