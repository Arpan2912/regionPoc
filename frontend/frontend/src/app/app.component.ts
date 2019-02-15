import { Component } from '@angular/core';
import io from 'socket.io-client';
import { UtilsService } from './utils.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  count = 0;
  profileForm;
  loginForm;
  country;
  constructor(private _utilsService: UtilsService) {
    this.getUserCount();
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      region: new FormControl(''),
      type: new FormControl(''),
    });

    this.loginForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      region: new FormControl(''),
    });
  }

  login() {
    let body = {
      name: 'arpan',
      password: '123'
    }

    this._utilsService.login(this.loginForm.value)
      .then(data => {
        let self = this;
        console.log("data", data);
        let res = JSON.parse(data['_body']);
        console.log("res", res.name, res.region);
        this.country = res.region;
        const socket = io(`http://localhost:3000?name=${res.name}&region=${res.region}`);
        socket.on('connect', function (err, io) {
          console.log("user connected", io);
          socket.on('admin', (data) => {
            self.count = data;
            console.log("data", data);
            console.log("err", err);
          })
        });
      })

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this._utilsService.addUser(this.profileForm.value).then(data => {
      console.log("data", data);
    })
  }


  getUserCount() {
    this._utilsService.getUserCount({})
      .then(data => {
        let res = data['_body'];
        this.count = res;
      })
  }
}
