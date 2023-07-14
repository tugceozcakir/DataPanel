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
    // Calculate the start and end index for the displayed categories based on the current page and page size
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategories = this.categories.slice(startIndex, endIndex);
  }

  nextPage(): void {
    // Move to the next page if it exists
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedCategories();
    }
  }

  canNext(): boolean {
    // Check if there is a next page
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }

  previousPage(): void {
    // Move to the previous page if it exists
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCategories();
    }
  }

  canPrevious(): boolean {
    // Check if there is a previous page
    return this.currentPage > 1;
  }

  deleteCategory(index: number): void {
    // Delete a category from the displayedCategories array and update the totalItems count
    const deletedCategory = this.displayedCategories[index];
    const categoryIndex = this.categories.indexOf(deletedCategory);

    if (categoryIndex !== -1) {
      this.categories.splice(categoryIndex, 1);
      this.totalItems--;

      // Update displayedCategories
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
      if (result) {
        // Generate a new categoryId for the new category
        const lastCategoryId = this.categories.length > 0 ? this.categories[this.categories.length - 1].categoryId : 0;
        result.categoryId = lastCategoryId + 1;

        // Add the new category to the categories array and update the totalItems count
        this.categories.push(result);
        this.totalItems++;
        this.updateDisplayedCategories();
      }
    });
  }
}