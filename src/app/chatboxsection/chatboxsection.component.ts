import { IUser } from '../models/userinterface';
import { IMessage } from '../models/messageinterface';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'chatboxsection',
  templateUrl: './chatboxsection.component.html',
  styleUrls: ['./chatboxsection.component.scss']
})
export class ChatboxsectionComponent implements OnInit {

  constructor() { }
  @Input() message: IMessage;
  @Input() currentUser: IUser;
  @Input() activeFriend: IUser;
  public currentImage: string = '';
  public messagePosition: string = '';
  public messageUserName: string = '';
  ngOnInit() {
    if (this.currentUser.uid === this.message.uid) {
      this.messagePosition = 'right-msg';
      this.currentImage = this.currentUser.imageUrl;
      this.messageUserName = this.currentUser.userName;
    } else {
      this.messagePosition = 'left-msg';
      this.currentImage = this.activeFriend.imageUrl;
      this.messageUserName = this.activeFriend.userName;
    }
  }
  messageTime(date: Date) {
    return moment(date).format('hh:mm A');
  }
}
