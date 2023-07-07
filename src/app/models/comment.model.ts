export class Comment {
  commentId: number;
  postId: number;
  userId: number; 
  comment: string;
  creationDate: Date;
  isConfirmed: boolean;

  constructor() {
    this.commentId = 0;
    this.postId = 0;
    this.userId = 0;
    this.comment = '';
    this.creationDate = new Date();
    this.isConfirmed = false;
  }
}
