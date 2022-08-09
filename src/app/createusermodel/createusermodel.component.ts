import { Router } from '@angular/router';
import { Configurations } from '../config';
import { Utility } from '../models/utility';
import { IUser, IUserIcons } from '../models/userinterface';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'create-user-model',
  templateUrl: './createusermodel.component.html',
  styleUrls: ['./createusermodel.component.scss']
})
export class CreateusermodelComponent implements OnInit {
  public submitted: boolean = false;
  public userRegistration: FormGroup;
  private iconsList: IUserIcons = {
    male: ['male-1.svg', 'male-2.svg', 'male-3.svg', 'male-4.svg', 'male-5.svg', 'male-6.svg'],
    female: ['female-1.svg', 'female-2.svg', 'female-3.svg', 'female-4.svg', 'female-5.svg', 'female-6.svg', 'female-7.svg', 'female-8.svg', 'female-9.svg']
  };
  public userData: IUser = { gender: '', imageUrl: '', userName: '', dateOfBirth: '', uid: Utility.guid(), createdDate: new Date() };
  public customValidation: Record<string, any> = {};

  constructor(private formBuilder: FormBuilder, private route: Router,
    private chatService: ChatService) { }

  ngOnInit() {
    this.userRegistration = this.formBuilder.group({
      gender: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      termsConditions: ['', [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userRegistration.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.userRegistration.invalid && this.isCheckAdultAge()) {
      switch (this.userData.gender) {
        case 'male':
          this.userData.imageUrl = `../../assets/persons/male/${this.iconsList['male'][Math.floor(Math.random() * this.iconsList['male'].length)]}`;
          break
        case 'female':
          this.userData.imageUrl = `../../assets/persons/female/${this.iconsList['female'][Math.floor(Math.random() * this.iconsList['female'].length)]}`;
          break
      }
      this.userData.createdDate = new Date();
      sessionStorage.setItem("currentUserId", this.userData.uid);
      Configurations.setConfigData({ key: 'currentUserId', value: this.userData.uid });
      this.chatService.sendUserPresence(this.userData);
      sessionStorage.setItem('activepage', '/UserListing');
      this.route.navigate(['/UserListing']);
    }
  }
  isCheckAdultAge() {
    const date18YrsAgo = new Date();
    date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
    if (new Date(this.userData.dateOfBirth) >= date18YrsAgo) {
      this.customValidation = {
        dob: 'Your not adult'
      };
    } else {
      this.customValidation = { dob: '' };
    }
    return new Date(this.userData.dateOfBirth) <= date18YrsAgo;
  }

}
