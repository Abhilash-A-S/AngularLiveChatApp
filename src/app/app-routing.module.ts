import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from "./app-main/app-main.component";
import { CreateusermodelComponent } from "./createusermodel/createusermodel.component"
import { IndividualChatComponent } from "./individual-chat/individual-chat.component"

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: CreateusermodelComponent, pathMatch: 'full' },
    { path: 'Createuser', component: CreateusermodelComponent, pathMatch: 'full' },
    { path: 'UserListing', component: AppMainComponent, pathMatch: 'full' },
    { path: 'IndividualChat', component: IndividualChatComponent, pathMatch: 'full' },
  ]
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
