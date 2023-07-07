import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponentComponent } from './delete-user-dialog-component/delete-user-dialog-component.component'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    PostListComponent,
    PostDetailComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CommentListComponent,
    CommentDetailComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponentComponent,
    AddPostDialogComponent,
    AddCommentDialogComponent,
    AddCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, 
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
