import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Configurations } from '../config';
import { IUser } from '../models/userinterface';
import { IMessage } from '../models/messageinterface';
import { ToasterMessage } from '../models/toastermessageconfig';

@Injectable()
export class ChatService {
  public socket: any;
  private currentUser: IUser;
  private currentUserSubject = new Subject<IUser>();
  private currentMessageSubject = new Subject<any>();

  constructor() {
    this.socket = io.connect('http://localhost:9001', { transports: ['websocket', 'polling'] });
  }

  sendUserPresence(userData: IUser) {
    this.socket.emit('userPresence', userData);
  }

  onRecieveToasterMessage(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('onRecieveToasterMessage', (data: any) => {
        if (data.currentUserId === Configurations.config['currentUserId']) {
          const toasterMessage: Record<string, object> = {
            message: data.message,
            messageCofiguration: ToasterMessage.messageConfig()[data.type]
          }
          Subscribe.next(toasterMessage);
        }
      });
    });
  }

  fetchOnlineUsers(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('onlineUsers', (userJson: IUser[]) => {
        let onlineUsers: IUser[] = [];
        userJson.forEach((user: any) => {
          if (user.uid === Configurations.config['currentUserId']) {
            this.currentUser = user;
            this.currentUserSubject.next(this.currentUser);
          } else {
            onlineUsers = onlineUsers.concat(user);
          }
        });
        Subscribe.next(onlineUsers);
      });
    });
  }

  fetchActiveUsers() {
    this.socket.emit('fetchAllUsers');
  }

  addNewFriend(friend: IUser, currentUserId: string) {
    this.socket.emit('manageFriendsList', { friendData: friend, currentUserId: currentUserId });
  }

  fetchActiveFriends(currentUserId: string) {
    this.socket.emit('fetchActiveFriends', currentUserId);
  }

  activeFriendsCollections(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('friendsCollections', (data: IUser, currentUserId: string) => {
        if (currentUserId === Configurations.config['currentUserId']) {
          Subscribe.next(data);
        }
      });
    });
  }

  sendMessage(message: IMessage) {
    this.socket.emit('storeMessageToDb', { message: message, currentUserId: Configurations.config['currentUserId'] });
  }

  OnMessageReceieve(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('OnRecieveMessage', (message: IMessage) => {
        if (message.uid === Configurations.config['currentUserId'] &&
          message.friendId === Configurations.config['activeFriendId'] ||
          message.uid === Configurations.config['activeFriendId'] &&
          message.friendId === Configurations.config['currentUserId']) {
          Subscribe.next(message);
        }
        this.currentMessageSubject.next(message);
      });
    });
  }

  onLastMessageReceive() {
    return new Observable((Subscribe) => {
      this.socket.on('onLastMessageReceive', (message: IMessage) => {
        if (message.uid !== Configurations.config['currentUserId'])
          Subscribe.next(message);
      });
    });
  }

  lastMessageonRecieve(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('lastMessageonRecieve', (message: IMessage) => {
        Subscribe.next(message);
      });
    });
  }
  fetchAllMessages(loginedIds: Record<string, string>) {
    this.socket.emit('getAllMessages', loginedIds);
  }

  OnRecieveAllMessage(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('OnRecieveAllMessage', (data: IMessage[], currentUserId: string) => {
        if (currentUserId === Configurations.config['currentUserId']) {
          Subscribe.next(data);
        }
      });
    });
  }
  OnRecieveFriendsCollection(): Observable<any> {
    return new Observable((Subscribe) => {
      this.socket.on('OnRecieveFriendsCollection', (data: Record<string, any>) => {
        if (data['currentUserId'] === Configurations.config['currentUserId']) {
          Subscribe.next(data);
        }
      });
    });
  }

  fetchCurrentUserData() {
    return this.currentUser;
  }
  getCurrentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable()
  }
  fetchNewMessage(): Observable<IMessage> {
    return this.currentMessageSubject.asObservable()
  }
  fetchActiveUserFiends(userUid: string) {
    this.socket.emit('fetchActiveUserFiends', userUid);
  }
}