import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  categoryId: string | null;
  categoryDetail: Category = new Category();
  postCount: number = 0;
  initialCategoryDetails: Category = new Category();
  editedCategoryName: string = '';
  editedCategoryId: string = '';
  editedCreationDate: string = '';
  changes: string = '';
  saveStatus: string = '';
  isChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private datePipe: DatePipe
  ) {
    this.categoryId = null;
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    console.log('Category ID:', this.categoryId);
    this.fetchCategoryDetails();
  }

  fetchCategoryDetails() {
    if (this.categoryId !== null) {
      this.categoryService.getCategory().subscribe(
        (categories: Category[]) => {
          console.log('Category Data:', categories);
          const category = categories.find((c) => c.categoryId === parseInt(this.categoryId!));
          if (category) {
            this.categoryDetail = { ...category };
            this.initialCategoryDetails = { ...category };
            this.editedCategoryName = category.name;
            this.editedCategoryId = category.categoryId.toString();
  
            const creationDate = new Date(this.categoryDetail.creation_date);
            this.editedCreationDate = this.datePipe.transform(creationDate, 'MM/dd/yyyy');

            this.fetchPostCount();
          } else {
            this.categoryDetail = new Category();
            this.initialCategoryDetails = new Category();
          }
        },
        (error) => {
          console.error('Error fetching category details:', error);
        }
      );
    }
  }
  
  
  fetchPostCount() {
    this.categoryService.getPostCountByCategoryId(this.categoryDetail.categoryId.toString()).subscribe(
      (count: number) => {
        this.postCount = count;
      },
      (error) => {
        console.error('Error fetching post count:', error);
      }
    );
  }

saveChanges() {
  this.categoryDetail.name = this.editedCategoryName;
  this.categoryDetail.categoryId = parseInt(this.editedCategoryId);

  this.isChanged = false;
  this.changes = `Category ID: ${this.editedCategoryId}, Category Name: ${this.editedCategoryName}, Creation Date: ${this.editedCreationDate ? this.datePipe.transform(this.editedCreationDate, 'dd/MM/yyyy') : ''}`;

  this.categoryService.updateCategory(this.categoryDetail).subscribe(
    (response) => {
      console.log('Category details successfully updated:', response);
      this.saveStatus = 'Changes saved successfully!';
    },
    (error) => {
      console.error('Error while saving category changes:', error);
      this.saveStatus = 'Error saving changes.';
    }
  );
}

  onChange() {
    const isNameChanged = this.initialCategoryDetails.name !== this.editedCategoryName;
    const isIdChanged = this.initialCategoryDetails.categoryId !== parseInt(this.editedCategoryId);

    // Compare dates by creating a new Date object
    const initialCreationDate = new Date(this.initialCategoryDetails.creation_date);
    const editedCreationDate = new Date(this.editedCreationDate);
    const isCreationDateChanged = initialCreationDate.getTime() !== editedCreationDate.getTime();

    this.isChanged = isNameChanged || isIdChanged || isCreationDateChanged;
  }
}
