import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { InformationsComponent } from './admin/informations/informations.component';
import { LoginComponent } from './admin/login/login.component';
import { PostFormComponent } from './admin/post-form/post-form.component';
import { PostsComponent } from './admin/posts/posts.component';
import { VideoFormComponent } from './admin/video-form/video-form.component';
import { VideoComponent } from './admin/video/video.component';
import { CateComponent } from './client/cate/cate.component';
import { DetailPostComponent } from './client/detail-post/detail-post.component';
import { DetailVideoComponent } from './client/detail-video/detail-video.component';
import { FindComponent } from './client/find/find.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { HomeComponent } from './client/home/home.component';
import { InformationFormComponent } from './client/information-form/information-form.component';
import { LoginClientComponent } from './client/login-client/login-client.component';
import { PostSidebarComponent } from './client/post-sidebar/post-sidebar.component';
import { SignupComponent } from './client/signup/signup.component';
import { StatusComponent } from './client/status/status.component';
import { VerifyEmailComponent } from './client/verify-email/verify-email.component';
import { VideoListComponent } from './client/video-list/video-list.component';
import { VideoSidebarComponent } from './client/video-sidebar/video-sidebar.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'adminCategory', component: CategoriesComponent },
  { path: 'adminCategory-form', component: CategoryFormComponent },
  { path: 'adminPost', component: PostsComponent },
  { path: 'adminPost-form', component: PostFormComponent },
  { path: 'adminVideo', component: VideoComponent },
  { path: 'adminVideo-form', component: VideoFormComponent },
  { path: 'adminInformation', component: InformationsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginClientComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'status',component: StatusComponent},
  { path: 'information-form', component: InformationFormComponent},
  { path: 'detail-post/:key', component: PostSidebarComponent},
  { path: 'video-list', component: VideoListComponent},
  { path: 'detail-video/:key', component: VideoSidebarComponent},
  { path: 'find', component: FindComponent},
  { path:'cate',component: CateComponent},
  { path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
