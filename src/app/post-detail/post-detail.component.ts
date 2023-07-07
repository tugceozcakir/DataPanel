import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId: string | null;
  postDetail: Post = new Post();
  initialPostDetails: Post = new Post();
  editedTitle: string = '';
  editedContent: string = '';
  changes: string = '';
  saveStatus: string = '';
  isChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = null;
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.fetchPostDetails();
  }

  fetchPostDetails() {
    if (this.postId !== null) {
      this.postService.getPosts().subscribe(
        (data) => {
          this.postDetail = data.find((post) => post.postId === parseInt(this.postId!));
          this.editedTitle = this.postDetail.title;
          this.editedContent = this.postDetail.content;
          this.initialPostDetails = { ...this.postDetail };
        },
        (error) => {
          console.error('Error fetching post details:', error);
        }
      );
    }
  }

  saveChanges() {
    this.postDetail.title = this.editedTitle;
    this.postDetail.content = this.editedContent;
    this.isChanged = false;

    this.changes = `Title: ${this.editedTitle}, Content: ${this.editedContent}`;

    this.postService.updatePost(this.postDetail).subscribe(
      (response) => {
        console.log('Post details updated successfully:', response);
        this.saveStatus = 'Changes saved successfully!';
      },
      (error) => {
        console.error('Error updating post details:', error);
        this.saveStatus = 'Error saving changes.';
      }
    );
  }

  onChange() {
    const isTitleChanged = this.initialPostDetails.title !== this.editedTitle;
    const isContentChanged = this.initialPostDetails.content !== this.editedContent;
    this.isChanged = isTitleChanged || isContentChanged;
  }
}
