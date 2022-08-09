import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {
  public showIndividualChat: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
