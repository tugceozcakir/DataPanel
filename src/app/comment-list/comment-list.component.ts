import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../models/comment.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  displayedComments: Comment[] = [];
  categoryId: string | null = null;

  constructor(private commentService: CommentService, 
    private router: Router,     
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.commentService.getComments().subscribe((data: Comment[]) => {
      this.comments = data;
      this.totalItems = this.comments.length;
      this.updateDisplayedComments();
    });
  }

  updateDisplayedComments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedComments = this.comments.slice(startIndex, endIndex);
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedComments();
    }
  }

  canNext(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedComments();
    }
  }

  canPrevious(): boolean {
    return this.currentPage > 1;
  }

  deleteComment(index: number) {
    const deletedComment = this.displayedComments[index]; //Deleted comment
    const commentIndex = this.comments.indexOf(deletedComment); //Comment index
  
    if (commentIndex !== -1) {
      this.comments.splice(commentIndex, 1); //Remove the comment from the comments
      this.totalItems--; //Reduce total items
  
      //Update displayedComments
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedComments = this.comments.slice(startIndex, endIndex);
    }
  }
  
  addComment() {
    const dialogRef: MatDialogRef<AddCommentDialogComponent> = this.dialog.open(AddCommentDialogComponent, {
      width: '30%',
    });
  
    dialogRef.afterClosed().subscribe((result: Comment) => {
      if (result) {
        //Add new users to list
        const lastCommentId = this.comments.length > 0 ? this.comments[this.comments.length - 1].commentId : 0;
        result.commentId = lastCommentId + 1;
        this.comments.push(result);
        this.totalItems++;
        this.updateDisplayedComments();
      }
    });
  }
}
