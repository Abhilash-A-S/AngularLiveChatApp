import { Router } from '@angular/router';
import { Configurations } from './config';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit() {
    this.checkUserExist();
  }
  checkUserExist() {
    const userId = sessionStorage.getItem('currentUserId');
    const activeFriendId = sessionStorage.getItem('activefrienduid');
    let activePage = sessionStorage.getItem('activepage');
    if (userId && activeFriendId) {
      Configurations.setConfigData({ key: 'currentUserId', value: userId });
      Configurations.setConfigData({ key: 'activeFriendId', value: activeFriendId });
      if (!activePage) {
        activePage = '/IndividualChat';
      }
    } else if (userId) {
      Configurations.setConfigData({ key: 'currentUserId', value: userId });
      if (!activePage) {
        activePage = '/UserListing';
      }
    } else {
      activePage = '/Createuser';
      if (!activePage) {
        activePage = '/Createuser';
      }
    }
    sessionStorage.setItem('activepage', activePage);
    this.route.navigate([activePage]);
  }
}