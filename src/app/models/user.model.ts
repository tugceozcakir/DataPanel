export class User {
  userId: number;
  username: string;
  email: string;
  creationDate: Date;
  isActive: boolean;

  constructor() {
    this.userId = 0;
    this.username = '';
    this.email = '';
    this.creationDate = new Date();
    this.isActive = false;
  }
}
