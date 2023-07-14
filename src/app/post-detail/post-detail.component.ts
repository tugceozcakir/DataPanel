import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [DatePipe]
})
export class PostDetailComponent implements OnInit {
  postId: string | null;
  postDetail: Post = new Post();
  initialPostDetails: Post = new Post();
  editedPostId: string = '';
  editedTitle: string = '';
  editedContent: string = '';
  editedCreationDate: string = '';
  changes: string = '';
  saveStatus: string = '';
  isChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private datePipe: DatePipe
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
          this.editedPostId = this.postDetail.postId.toString();
          this.editedTitle = this.postDetail.title;
          this.editedContent = this.postDetail.content;

          const creationDate = new Date(this.postDetail.creationDate);
          this.editedCreationDate = this.datePipe.transform(creationDate, 'MM/dd/yyyy');

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

    this.changes = `Post ID: ${this.editedPostId}, Title: ${this.editedTitle}, Content: ${this.editedContent}, Creation Date: ${this.editedCreationDate}`;

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
    const isPostIdChanged = this.initialPostDetails.postId.toString() !== this.editedPostId;
  
    // Compare dates by creating a new Date object
    const initialCreationDate = new Date(this.initialPostDetails.creationDate);
    const editedCreationDate = new Date(this.editedCreationDate);
    const isCreationDateChanged = initialCreationDate.getTime() !== editedCreationDate.getTime();
  
    this.isChanged = isTitleChanged || isContentChanged || isPostIdChanged || isCreationDateChanged;
  }
}
