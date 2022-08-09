import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/userinterface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private activateNewFriendSubject = new Subject<IUser>();

  constructor() { }

  setActiveNewFriend(user: IUser) {
    this.activateNewFriendSubject.next(user);
  }
  getActiveNewFriend(): Observable<any> {
    return this.activateNewFriendSubject.asObservable();
  }
}
