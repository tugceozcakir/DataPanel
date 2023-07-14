import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  commentId: string | null;
  commentDetail: Comment = new Comment();
  
  initialCommentDetails: Comment = new Comment();
  editedCommentId: string = '';
  editedPostId: string = '';
  editedUserId: string = '';
  editedComment: string = '';
  editedCreationDate: string = '';
  changes: string = '';
  saveStatus: string = '';
  isChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private datePipe: DatePipe
  ) {
    this.commentId = null;
  }

  ngOnInit() {
    this.commentId = this.route.snapshot.paramMap.get('id');
    console.log('Comment ID:', this.commentId);
    this.fetchCommentDetails();
  }

  fetchCommentDetails() {
    if (this.commentId !== null) {
      this.commentService.getComments().subscribe(
        (data: Comment[]) => {
          console.log('Comments Data:', data);
          this.commentDetail = data.find((comment) => comment.commentId === parseInt(this.commentId!)) || new Comment();
          this.editedCommentId = this.commentDetail.commentId.toString();
          this.editedPostId = this.commentDetail.postId.toString();
          this.editedUserId = this.commentDetail.userId.toString();
          this.editedComment = this.commentDetail.comment;
          const creationDate = new Date(this.commentDetail.creationDate);
          this.editedCreationDate = this.datePipe.transform(creationDate, 'dd/MM/yyyy');
          this.initialCommentDetails = { ...this.commentDetail };
        },
        (error) => {
          console.error('Error fetching comment details:', error);
        }
      );
    }
  }

  saveChanges() {
    this.commentDetail.commentId = parseInt(this.editedCommentId);
    this.commentDetail.postId = parseInt(this.editedPostId);
    this.commentDetail.userId = parseInt(this.editedUserId);
    this.commentDetail.comment = this.editedComment;
    this.isChanged = false;

    this.changes = `Comment ID: ${this.editedCommentId}, Post ID: ${this.editedPostId}, User ID: ${this.editedUserId}, Comment: ${this.editedComment}`;

    this.commentService.updateComment(this.commentDetail).subscribe(
      (response) => {
        console.log('Comment details updated successfully:', response);
        this.saveStatus = 'Changes saved successfully!';
      },
      (error) => {
        console.error('Error saving comment changes:', error);
        this.saveStatus = 'Error saving changes.';
      }
    );
  }

  onChange() {
    const isCommentIdChanged = this.initialCommentDetails.commentId.toString() !== this.editedCommentId;
    const isPostIdChanged = this.initialCommentDetails.postId.toString() !== this.editedPostId;
    const isUserIdChanged = this.initialCommentDetails.userId.toString() !== this.editedUserId;
    const isCommentChanged = this.initialCommentDetails.comment !== this.editedComment;
    this.isChanged = isCommentIdChanged || isPostIdChanged || isUserIdChanged || isCommentChanged;
  }
}
