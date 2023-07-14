export class Category {
  categoryId: number;
  name: string;
  creation_date: Date; 

  constructor() {
    this.categoryId = 0;
    this.name = '';
    this.creation_date = new Date();
  }
}
