import { Router } from '@angular/router';
import { Configurations } from '../config';
import { Utility } from '../models/utility';
import { IUser } from '../models/userinterface';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  public userList: IUser[] = [];
  public searchText: string = '';
  public showLoader: boolean = false;
  private friendList: IUser[] = [];
  private fetchOnlineUsersSubscription: Subscription;
  private onRecieveFriendsCollectionSubscription: Subscription;
  
  constructor(private router: Router,
    private chatService: ChatService) { }

  ngOnInit() {
    this.showLoader = true;
    this.chatService.fetchActiveUsers();
    this.chatService.fetchActiveUserFiends(Configurations.getConfigData('currentUserId'));

    this.fetchOnlineUsersSubscription = this.chatService.fetchOnlineUsers().subscribe((users: IUser[]) => {
      setTimeout(() => {
        this.showLoader = false;
        this.userList = users.sort((a: IUser, b: IUser) => {
          return new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1;
        });
      }, 500);
    });
    this.onRecieveFriendsCollectionSubscription = this.chatService.OnRecieveFriendsCollection().subscribe((friendData: Record<string, any>) => {
      if (friendData['currentUserId'] === Configurations.getConfigData('currentUserId')) {
        this.friendList = friendData['FriendList'];
      }
    });
  }

  addToFriendList(friend: IUser) {
    const isExistUser = this.friendList.findIndex((user: IUser) => user.uid === friend.uid);
    Configurations.setConfigData({ key: "activeFriendId", "value": friend.uid });
    sessionStorage.setItem("activefrienduid", friend.uid);
    if (isExistUser === -1) {
      this.chatService.addNewFriend(friend, Configurations.getConfigData('currentUserId'));
    }
    sessionStorage.setItem('activepage', '/IndividualChat');
    this.router.navigate(['/IndividualChat']);
  }
  filteredUserList(): IUser[] {
    return this.userList.filter((user: IUser) => {
      return (user.userName.toLowerCase().includes(this.searchText.toLowerCase()));
    });
  }
  formatDate(date: Date) {
    return moment(date).format("DD-MM-YYYY HH:mm:ss");
  }
  IsFriendCheck(user: IUser) {
    const isExistFriend = this.friendList.findIndex((friend: IUser) => friend.uid === user.uid);
    return isExistFriend > -1;
  }
  ngOnDestroy() {
    this.fetchOnlineUsersSubscription?.unsubscribe();
    this.onRecieveFriendsCollectionSubscription?.unsubscribe();
  }
}
