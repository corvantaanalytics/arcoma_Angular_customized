import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditService } from './user-edit/user-edit.service';
import { UserService } from 'app/auth/service';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewService } from './user-view/user-view.service';
import { userInfo } from 'os';
import { UserListService } from './user-list/user-list.service';

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent, 
    resolve: {
      uls: UserListService
    },
  },
  {
    path: 'edit',
    component: UserEditComponent,
    resolve: {
      uls: UserEditService
    },
  },
  {
    path: 'view/:id',
    component: UserViewComponent,
    resolve: {
      uls: UserViewService
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
