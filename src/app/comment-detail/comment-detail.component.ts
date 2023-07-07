import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  commentId: string | null;
  commentDetail: Comment = new Comment();

  initialCommentDetails: Comment = new Comment();
  editedComment: string = '';
  changes: string = '';
  saveStatus: string = '';
  isChanged: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
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
          this.editedComment = this.commentDetail.comment;
          this.initialCommentDetails = { ...this.commentDetail };
        },
        (error) => {
          console.error('Error fetching comment details:', error);
        }
      );
    }
  }

  saveChanges() {
    this.commentDetail.comment = this.editedComment;
    this.isChanged = false;

    this.changes = `Comment: ${this.editedComment}`;

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
    const isCommentChanged = this.initialCommentDetails.comment !== this.editedComment;
    this.isChanged = isCommentChanged;
  }
  
}