import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppMainComponent } from './app-main/app-main.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { IndividualChatComponent } from './individual-chat/individual-chat.component';
import { CreateusermodelComponent } from './createusermodel/createusermodel.component';
import { ChatService } from './services/chat.service';
import { ToastmessageComponent } from './toastmessage/toastmessage.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatboxsectionComponent } from './chatboxsection/chatboxsection.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateusermodelComponent,
    AppHeaderComponent,
    UserListingComponent,
    AppMainComponent,
    FriendListComponent,
    IndividualChatComponent,
    ToastmessageComponent,
    ChatboxsectionComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
