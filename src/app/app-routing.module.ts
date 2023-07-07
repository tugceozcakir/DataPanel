import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'comments', component: CommentListComponent },
  { path: 'comment-detail/:id', component: CommentDetailComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'category-detail/:categoryId', component: CategoryDetailComponent },
  { path: 'post-detail/:postId', component: PostDetailComponent },
  { path: 'user-detail/:userId', component: UserDetailComponent},
  { path: 'comment-detail/:id', component: CommentDetailComponent },
  { path: 'posts/:categoryId', component: PostListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
