import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  displayedPosts: Post[] = [];
  filteredPosts: Post[] = [];

  filter = {
    userId: undefined,
    postId: undefined,
    categoryId: undefined
  };

  constructor(
    private postService: PostService, 
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    ) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.filter.userId = params['userId'] ? +params['userId'] : undefined;
        this.filter.postId = params['postId'] ? +params['postId'] : undefined;
        this.filter.categoryId = params['categoryId'] ? +params['categoryId'] : undefined;
    
        this.postService.getPosts().subscribe((data: Post[]) => {
          this.posts = data;
          this.totalItems = this.posts.length;
          this.applyFilters(this.filter.userId, this.filter.postId, this.filter.categoryId);
        });
      });
    }
    

  updateDisplayedPosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    if (this.filter.userId || this.filter.postId || this.filter.categoryId) {
      this.filteredPosts = this.posts
        .filter(post => 
          (!this.filter.userId || post.userId === this.filter.userId) &&
          (!this.filter.postId || post.postId === this.filter.postId) &&
          (!this.filter.categoryId || post.categoryId === this.filter.categoryId)
        );
    } else {
      this.filteredPosts = this.posts;
    }
    
    this.displayedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }
  

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedPosts();
    }
  }

  canNext(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedPosts();
    }
  }

  canPrevious(): boolean {
    return this.currentPage > 1;
  }

  deletePost(index: number) {
    const deletedPost = this.displayedPosts[index]; //Deleted post
    const postIndex = this.posts.indexOf(deletedPost); //Post index
  
    if (postIndex !== -1) {
      this.posts.splice(postIndex, 1); // Remove the post from the posts
      this.totalItems--; //Reduce total items
  
      //Update displayedPosts
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedPosts = this.filteredPosts.slice(startIndex, endIndex);
    }
  }
  

  applyFilters(userId: number, postId: number, categoryId: number) {
    this.filter.userId = userId;
    this.filter.postId = postId;
    this.filter.categoryId = categoryId;
    this.updateDisplayedPosts();
  
    //Append query parameters to the end of the address
    this.router.navigate([], {
      queryParams: {
        userId: userId ? userId : null,
        postId: postId ? postId : null,
        categoryId: categoryId ? categoryId : null
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route
    });
  }
  
  
  
  addPost() {
    const dialogRef: MatDialogRef<AddPostDialogComponent> = this.dialog.open(AddPostDialogComponent, {
      width: '30%',
    });
  
    dialogRef.afterClosed().subscribe((result: Post) => {
      if (result) {
        //Add new users to list
        const lastPostId = this.posts.length > 0 ? this.posts[this.posts.length - 1].postId : 0;
        result.postId = lastPostId + 1;
        this.posts.push(result);
        this.totalItems++;
        this.updateDisplayedPosts();
      }
    });
  }
  
}
