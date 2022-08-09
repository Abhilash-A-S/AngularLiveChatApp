import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'toastmessage',
  templateUrl: './toastmessage.component.html',
  styleUrls: ['./toastmessage.component.scss']
})
export class ToastmessageComponent implements OnInit {
  public style: object;
  public message: string;
  public showToasterMessage: boolean = false;
  private onRecieveToasterMessageSubscription: Subscription
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.onRecieveToasterMessageSubscription = this.chatService.onRecieveToasterMessage().subscribe((result) => {
      this.message = result.message;
      this.showToasterMessage = true;
      this.style = result.messageCofiguration.style;
    });
  }

  ngOnDestroy() {
    this.onRecieveToasterMessageSubscription?.unsubscribe();
  }
}
