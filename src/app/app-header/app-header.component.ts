import { Router } from '@angular/router'
import { Configurations } from '../config';
import { IUser } from '../models/userinterface'
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  public currentUser: IUser;
  public messageList: any = [];
  public showChatModel: boolean = false;
  public onlineUserList: IUser[] = [];
  private friendList: IUser[] = [];
  private getCurrentUserSubscription: Subscription;
  private fetchOnlineUsersSubscription: Subscription;
  private onLastMessageReceiveSubscription: Subscription;
  private onRecieveFriendsCollectionSubscription: Subscription;

  constructor(private chatService: ChatService,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit() {
    this.getCurrentUserSubscription = this.chatService.getCurrentUser().subscribe((currentUser: IUser) => {
      this.currentUser = currentUser;
      if (this.currentUser.uid) {
        this.chatService.fetchActiveUserFiends(this.currentUser.uid);
      }
    });
    this.fetchOnlineUsersSubscription = this.chatService.fetchOnlineUsers().subscribe((users: IUser[]) => {
      if (users?.length) {
        this.onlineUserList = users;
      }
    });
    this.onLastMessageReceiveSubscription = this.chatService.onLastMessageReceive().subscribe((message: any) => {
      message.isReaded = false;
      const userDetails = this.onlineUserList.find((user) => user.uid === message.uid);
      if (userDetails && message.friendId === this.currentUser.uid &&
        message.uid !== Configurations.config['activeFriendId']) {
        this.messageList.unshift({ ...message, ...userDetails });
      }
    });
    this.onRecieveFriendsCollectionSubscription = this.chatService.OnRecieveFriendsCollection().subscribe((friendData: any) => {
      if (friendData.currentUserId === this.currentUser.uid) {
        this.friendList = friendData.FriendList;
      }
    });
  }
  navidateHome() {
    sessionStorage.removeItem('activefrienduid');
    Configurations.setConfigData({ key: "activeFriendId", "value": '' });
    sessionStorage.setItem('activepage', '/UserListing');
    this.router.navigate(['/UserListing'])
  }
  showChatBox() {
    this.showChatModel = !this.showChatModel;
  }
  getUnreadedMessage() {
    return this.messageList.filter((message: any) => !message.isReaded).length;
  }
  navidateFriendPage(message: any) {
    message['isReaded'] = true;
    this.messageList = this.messageList.filter((msg: any) => msg.uid !== message.uid)
    const isExistFiend = this.friendList.findIndex((user: IUser) => user.uid === message.uid);
    if (isExistFiend == -1) {
      Configurations.setConfigData({ key: "activeFriendId", "value": message.uid });
      sessionStorage.setItem("activefrienduid", message.uid);
      this.chatService.addNewFriend(message, Configurations.getConfigData('currentUserId'));
      if (sessionStorage.getItem('activepage') === '/IndividualChat') {
        this.commonService.setActiveNewFriend({
          uid: message.uid,
          gender: message.gender,
          imageUrl: message.imageUrl,
          userName: message.userName,
          createdDate: message.createdDate,
          dateOfBirth: message.dateOfBirth,
        });
      } else {
        sessionStorage.setItem('activepage', '/IndividualChat');
        this.router.navigate(['/IndividualChat']);
      }
    } else if (sessionStorage.getItem('activepage') === '/UserListing') {
      sessionStorage.setItem("activefrienduid", message.uid);
      Configurations.setConfigData({ key: 'activeFriendId', value: message.uid });
      sessionStorage.setItem('activepage', '/IndividualChat');
      this.router.navigate(['/IndividualChat']);
    } else {
      this.commonService.setActiveNewFriend({
        uid: message.uid,
        gender: message.gender,
        imageUrl: message.imageUrl,
        userName: message.userName,
        createdDate: message.createdDate,
        dateOfBirth: message.dateOfBirth,
      });
    }
  }
  ngOnDestroy() {
    this.getCurrentUserSubscription?.unsubscribe();
    this.fetchOnlineUsersSubscription?.unsubscribe();
    this.onLastMessageReceiveSubscription?.unsubscribe();
    this.onRecieveFriendsCollectionSubscription?.unsubscribe();
  }
}
