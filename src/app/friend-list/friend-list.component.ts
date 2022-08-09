import { Configurations } from '../config';
import { IUser } from '../models/userinterface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input() friendList: IUser[] = [];
  @Output() activeFriendChange: EventEmitter<IUser> = new EventEmitter();

  constructor() { }
  ngOnInit() {
  }
  activateChat(friend: IUser) {
    this.activeFriendChange.emit(friend);
  }
  getActiveFriendId() {
    return Configurations.config['activeFriendId']
  }
}