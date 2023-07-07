import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>
  ) {}

  ngOnInit() {
    //Start form
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      creationDate: [this.getCurrentDate(), Validators.required],
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      return;
    }
    //New category object
    const newCategory = {
      name: this.categoryForm.value.name,
      creationDate: this.categoryForm.value.creationDate
    };

    //Call service to add category
    this.categoryService.addCategory(newCategory).subscribe(() => {
      this.dialogRef.close(newCategory);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  //Get current date by default
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
