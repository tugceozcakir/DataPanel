import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent {
  postForm: FormGroup;
  newPost: Post = new Post();
  userIdInvalid: boolean = false;
  categoryIdInvalid: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddPostDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.postForm = this.formBuilder.group({
      userId: ['', Validators.required],
      categoryId: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      viewCount: [0, Validators.required],
      creationDate: [this.getCurrentDate(), Validators.required],
      isPublished: [false]
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }
  
    this.newPost.userId = this.postForm.value.userId;
    this.newPost.categoryId = this.postForm.value.categoryId;
    this.newPost.title = this.postForm.value.title;
    this.newPost.content = this.postForm.value.content;
    this.newPost.viewCount = this.postForm.value.viewCount;
    this.newPost.creationDate = this.postForm.value.creationDate;
    this.newPost.isPublished = this.postForm.value.isPublished;
  
    this.dialogRef.close(this.newPost);
  }
  

  cancel() {
    this.dialogRef.close();
  }

}
