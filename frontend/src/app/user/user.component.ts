import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { UtilsService } from '../utils.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'frontend';
  count = 0;
  profileForm;
  loginForm;
  country;
  constructor(
    private _utilsService: UtilsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.country = params['country'];
    });
  }

  logout(){
    localStorage.clear();
    
  }




}

