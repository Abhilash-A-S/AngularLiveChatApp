import { Configurations } from '../config';
import { Utility } from '../models/utility';
import { IUser } from '../models/userinterface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMessage } from '../models/messageinterface';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service'
@Component({
  selector: 'individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrls: ['./individual-chat.component.scss']
})
export class IndividualChatComponent implements OnInit {
  public currentUser: IUser;
  public activeFriend: IUser;
  public messageText: string = '';
  public friendList: IUser[] = [];
  public messageList: IMessage[] = [];
  public searchText: string = '';
  public showLoader: boolean = false;
  private fetchOnlineUsersSubscription: Subscription;
  private onMessageReceieveSubscription: Subscription;
  private onRecieveAllMessageSubscription: Subscription;
  private activeFriendsCollectionsSubscription: Subscription;
  @ViewChild('chatMessageContainer') private chatMessageContainer: ElementRef;

  constructor(private chatService: ChatService, private commonservice: CommonService) { }

  ngOnInit() {
    this.showLoader = true;
    this.chatService.fetchActiveUsers();
    this.chatService.fetchActiveFriends(Configurations.config['currentUserId']);

    this.fetchOnlineUsersSubscription = this.chatService.fetchOnlineUsers().subscribe((users: IUser[]) => {
      if (users?.length) {
        users.forEach((user: IUser) => {
          if (user.uid == Configurations.config['activeFriendId']) {
            this.activeFriend = user;
          }
        });
        this.currentUser = this.chatService.fetchCurrentUserData();
        this.chatService.fetchAllMessages({ uid: this.currentUser.uid, friendUid: this.activeFriend.uid });
      }
    });
    this.activeFriendsCollectionsSubscription = this.chatService.activeFriendsCollections().subscribe((friend: IUser[]) => {
      this.friendList = Utility.alphaNumericSorting(friend, 'userName');
    });
    this.onMessageReceieveSubscription = this.chatService.OnMessageReceieve().subscribe((lastMessage: IMessage) => {
      this.messageList = this.messageList.concat(lastMessage);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
    this.onRecieveAllMessageSubscription = this.chatService.OnRecieveAllMessage().subscribe((messages: IMessage[]) => {
      setTimeout(() => {
        this.showLoader = false;
        this.messageList = messages;
      }, 500);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
    this.commonservice.getActiveNewFriend().subscribe((user: IUser) => {
      const existFriend = this.friendList.find((ele: IUser) => ele.uid === user.uid);
      if (!existFriend) {
        this.friendList = this.friendList.concat(user);
      }
      this.activeFriendChange(user);
    });
  }
  activeFriendChange(newActiveFriend: IUser) {
    this.messageList = [];
    this.showLoader = true;
    this.activeFriend = newActiveFriend;
    sessionStorage.setItem("activefrienduid", newActiveFriend.uid);
    Configurations.setConfigData({ key: 'activeFriendId', value: newActiveFriend.uid });
    this.chatService.fetchAllMessages({ uid: this.currentUser.uid, friendUid: this.activeFriend.uid });
  }
  sendMessage() {
    if (this.messageText) {
      const messageData: IMessage = {
        createdTime: new Date(),
        uid: this.currentUser.uid,
        messageUid: Utility.guid(),
        messageText: this.messageText,
        friendId: this.activeFriend.uid
      }
      this.chatService.sendMessage(messageData);
      this.messageText = '';
    }
  }
  scrollToBottom() {
    try {
      const messageArea = this.chatMessageContainer.nativeElement.getElementsByClassName('message-section');
      if (messageArea.length) {
        // messageArea[messageArea.length - 1].scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
      }
      this.chatMessageContainer.nativeElement.scrollTop = this.chatMessageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
  filteredMessageList() {
    return this.messageList.filter((message: IMessage) => {
      return message.messageText.toLocaleLowerCase().includes(this.searchText.toLowerCase());
    });
  }
  ngOnDestroy() {
    this.fetchOnlineUsersSubscription?.unsubscribe();
    this.onMessageReceieveSubscription?.unsubscribe();
    this.onRecieveAllMessageSubscription?.unsubscribe();
    this.activeFriendsCollectionsSubscription?.unsubscribe();
  }
}
