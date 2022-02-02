import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CKEditorModule } from 'ckeditor4-angular';
import { ChartsModule } from 'ng2-charts';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavAdminComponent } from './admin/nav-admin/nav-admin.component';
import { LoginComponent } from './admin/login/login.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { PostsComponent } from './admin/posts/posts.component';
import { InformationsComponent } from './admin/informations/informations.component';
import { NavClientComponent } from './client/nav-client/nav-client.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { CategoryDetailComponent } from './admin/category-detail/category-detail.component';
import { PostDetailComponent } from './admin/post-detail/post-detail.component';
import { PostFormComponent } from './admin/post-form/post-form.component';
import { VideoComponent } from './admin/video/video.component';
import { VideoFormComponent } from './admin/video-form/video-form.component';
import { VideoDetailComponent } from './admin/video-detail/video-detail.component';
import { HomeComponent } from './client/home/home.component';
import { LoginClientComponent } from './client/login-client/login-client.component';
import { SignupComponent } from './client/signup/signup.component';
import { VerifyEmailComponent } from './client/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { StatusComponent } from './client/status/status.component';
import { InformationFormComponent } from './client/information-form/information-form.component';
import { InformationDetailComponent } from './admin/information-detail/information-detail.component';
import { SidebarComponent } from './client/sidebar/sidebar.component';
import { DetailPostComponent } from './client/detail-post/detail-post.component';
import { VideoListComponent } from './client/video-list/video-list.component';
import { DetailVideoComponent } from './client/detail-video/detail-video.component';
import { VideoSidebarComponent } from './client/video-sidebar/video-sidebar.component';
import { PostSidebarComponent } from './client/post-sidebar/post-sidebar.component';
import { FindComponent } from './client/find/find.component';
import { CateComponent } from './client/cate/cate.component';

@NgModule({
  declarations: [
    AppComponent,
    NavAdminComponent,
    LoginComponent,
    CategoriesComponent,
    PostsComponent,
    InformationsComponent,
    NavClientComponent,
    CategoryFormComponent,
    CategoryDetailComponent,
    PostDetailComponent,
    PostFormComponent,
    VideoComponent,
    VideoFormComponent,
    VideoDetailComponent,
    HomeComponent,
    LoginClientComponent,
    SignupComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    StatusComponent,
    InformationFormComponent,
    InformationDetailComponent,
    SidebarComponent,
    DetailPostComponent,
    VideoListComponent,
    DetailVideoComponent,
    VideoSidebarComponent,
    PostSidebarComponent,
    FindComponent,
    CateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularFirestoreModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    CKEditorModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
