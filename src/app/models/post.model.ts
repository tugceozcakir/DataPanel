export class Post {
    postId: number;
    userId: number;
    categoryId: number;
    title: string;
    content: string;
    viewCount: number;
    creationDate: Date;
    isPublished: boolean;
  
    constructor() {
      this.postId = 0;
      this.userId = 0;
      this.categoryId = 0;
      this.title = '';
      this.content = '';
      this.viewCount = 0;
      this.creationDate = new Date();
      this.isPublished = false;
    }
  }
  