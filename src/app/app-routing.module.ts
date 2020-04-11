import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {FlatListComponent} from './flat/flat-list/flat-list.component';
import {AdminLayoutComponent} from './admin-panel/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './admin-panel/dashboard-page/dashboard-page.component';
import {FlatDetailedComponent} from './flat/flat-detailed/flat-detailed.component';
import {ChatComponent} from './chat/chat.component';
import {RequestsComponent} from './admin-panel/requests/requests.component';
import {StatisticsComponent} from './admin-panel/statistics/statistics.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {ChatButtonComponent} from './chatbutton/chatbutton.component';
import {ProfileShortComponent} from './profile-short/profile-short.component';
import {AddFlatComponent} from './flat/add-flat/add-flat.component';
import {LoginGuard} from './guards/login.guard';
import {CommentsPageComponent} from './admin-panel/comments-page/comments-page.component';
import {UserPageComponent} from './admin-panel/user-page/user-page.component';
import {PostsPageComponent} from './admin-panel/posts-page/posts-page.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chatbutton', component: ChatButtonComponent},
  {path: 'addflat', component: AddFlatComponent},
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [LoginGuard, AuthGuard],
    data: {roles: ['ROLE_ADMIN', 'ROLE_MODERATOR']}, children: [
      {path: '', component: DashboardPageComponent, children: [
          {path: 'dashboard', component: DashboardPageComponent}
        ]},
      {path: 'comments', component: CommentsPageComponent},
      {path: 'user', component: UserPageComponent},
      {path: 'posts', component: PostsPageComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'statistics', component: StatisticsComponent}
    ]
  },

  {path: 'data', component: ProfileUserComponent, canActivate: [LoginGuard]},
  {path: 'short_profile/:id', component: ProfileShortComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
  {path: 'flats', component: FlatListComponent},
  {path: 'detailed/:id', component: FlatDetailedComponent},
  {
    path: '',
    redirectTo: '/flats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
