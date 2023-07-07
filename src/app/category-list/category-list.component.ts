import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  currentPage = 1;
  pageSize = 3;
  totalItems = 0;
  displayedCategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data: Category[]) => {
      this.categories = data;
      this.totalItems = this.categories.length;
      this.updateDisplayedCategories();
    });
  }

  updateDisplayedCategories(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategories = this.categories.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedCategories();
    }
  }

  canNext(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCategories();
    }
  }

  canPrevious(): boolean {
    return this.currentPage > 1;
  }

  deleteCategory(index: number): void {
    const deletedCategory = this.displayedCategories[index]; //Deleted item
    const categoryIndex = this.categories.indexOf(deletedCategory); //Find category index
  
    if (categoryIndex !== -1) {
      this.categories.splice(categoryIndex, 1); //Remove category from categories array
      this.totalItems--; //Reduce total item
  
      //Update displayedCategories
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedCategories = this.categories.slice(startIndex, endIndex);
    }
  }

  addCategory(): void {
    const dialogRef: MatDialogRef<AddCategoryDialogComponent> = this.dialog.open(AddCategoryDialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: Category) => {
      //Add new category to list
      if (result) {
        const lastCategoryId = this.categories.length > 0 ? this.categories[this.categories.length - 1].categoryId : 0;
        result.categoryId = lastCategoryId + 1;
        this.categories.push(result);
        this.totalItems++;
        this.updateDisplayedCategories();
      }
    });
  }
}
