import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent {
  commentForm: FormGroup;
  newComment: Comment = new Comment();
  postIdInvalid: boolean = false;
  userIdInvalid: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddCommentDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();

  }

  initializeForm() {
    this.commentForm = this.formBuilder.group({
      postId: ['', Validators.required],
      userId: ['', Validators.required],
      comment: ['', Validators.required],
      creationDate: [this.getCurrentDate(), Validators.required],
      isConfirmed: [false]
    });
  }

  //Add comment to list
  addComment() {
    if (this.commentForm.invalid) {
      return;
    }

    //Convert received values to decimal
    const postId = parseInt(this.commentForm.value.postId, 10);
    const userId = parseInt(this.commentForm.value.userId, 10);

    //If postId and userId are not valid numbers
    if (isNaN(postId)) {
      this.postIdInvalid = true;
      return;
    }

    if (isNaN(userId)) {
      this.userIdInvalid = true;
      return;
    }

    //Assign value
    this.newComment.postId = postId;
    this.newComment.userId = userId;
    this.newComment.comment = this.commentForm.value.comment;
    this.newComment.creationDate = this.commentForm.value.creationDate;
    this.newComment.isConfirmed = this.commentForm.value.isConfirmed;

    this.dialogRef.close(this.newComment);
  }

  //Press cancel without clicking add
  cancel() {
    this.dialogRef.close();
  }
  
  //Get current date
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
