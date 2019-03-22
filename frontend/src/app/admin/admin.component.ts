import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public users = null;
  public count = 0;
  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
    this._utilsService.getAdminUser(null)
      .then(data => {
        console.log("data", data);
      })
  }

  connect() {
    let self = this;
    const socket = io(`http://localhost:3000`);
    socket.on('connect', function (err, io) {
      console.log("user connected", io);
      socket.on('admin-count', (data) => {
        self['count'] = data;
        console.log("data", data);
        console.log("err", err);
      })
      socket.on('admin-users', (data) => {
        self['users'] = JSON.parse(data);
        console.log("users",self.users);
        console.log("data", data);
        console.log("err", err);
      })
    });
  }

}
